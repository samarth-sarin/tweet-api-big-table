"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExecuteQueryStateMachine = void 0;
exports.createCallerStream = createCallerStream;
const bytebuffertransformer_1 = require("./bytebuffertransformer");
const retry_options_1 = require("../utils/retry-options");
const tabular_api_surface_1 = require("../tabular-api-surface");
const createReadStreamInternal_1 = require("../utils/createReadStreamInternal");
const pumpify = require('pumpify');
const DEFAULT_TOTAL_TIMEOUT_MS = 60000;
/**
 * This object handles creating and piping the streams
 * which are used to process the responses from the server.
 * It's main purpose is to make sure that the callerStream, which
 * the user gets as a result of Instance.executeQuery, behaves properly:
 * -  closes in case of a failure
 * -  doesn't close in case of a retryable error.
 *
 *  We create the following streams:
 * responseStream -> byteBuffer -> readerStream -> resultStream
 *
 * The last two (readerStream and resultStream) are connected
 * and returned to the caller - hence called the callerStream.
 *
 * When a request is made responseStream and byteBuffer are created,
 * connected  and piped to the readerStream.
 *
 * On retry, the old responseStream-byteBuffer pair is discarded and a
 * new pair is crated.
 *
 * For more info please refer to the `State` type
 */
class ExecuteQueryStateMachine {
    bigtable;
    callerStream;
    originalEnd;
    retryOptions;
    valuesStream;
    requestParams;
    lastPreparedStatementBytes;
    preparedStatement;
    state;
    deadlineTs;
    protoBytesEncoding;
    numErrors;
    retryTimer;
    timeoutTimer;
    constructor(bigtable, callerStream, preparedStatement, requestParams, retryOptions, protoBytesEncoding) {
        this.bigtable = bigtable;
        this.callerStream = callerStream;
        this.originalEnd = callerStream.end.bind(callerStream);
        this.callerStream.end = this.handleCallersEnd.bind(this);
        this.requestParams = requestParams;
        this.retryOptions = this.parseRetryOptions(retryOptions);
        this.deadlineTs = Date.now() + this.retryOptions.totalTimeout;
        this.valuesStream = null;
        this.preparedStatement = preparedStatement;
        this.protoBytesEncoding = protoBytesEncoding;
        this.numErrors = 0;
        this.retryTimer = null;
        this.timeoutTimer = setTimeout(this.handleTotalTimeout, this.calculateTotalTimeout());
        this.state = 'AwaitingQueryPlan';
        this.preparedStatement.getData(this.handleQueryPlan, this.calculateTotalTimeout());
    }
    parseRetryOptions = (input) => {
        const rCodes = input?.retryCodes
            ? new Set(input?.retryCodes)
            : retry_options_1.RETRYABLE_STATUS_CODES;
        const backoffSettings = input?.backoffSettings;
        const clientTotalTimeout = this?.bigtable?.options?.BigtableClient?.clientConfig?.interfaces &&
            this?.bigtable?.options?.BigtableClient?.clientConfig?.interfaces['google.bigtable.v2.Bigtable']?.methods['ExecuteQuery']?.timeout_millis;
        return {
            maxRetries: backoffSettings?.maxRetries || retry_options_1.DEFAULT_RETRY_COUNT,
            totalTimeout: backoffSettings?.totalTimeoutMillis ||
                clientTotalTimeout ||
                DEFAULT_TOTAL_TIMEOUT_MS,
            retryCodes: rCodes,
            initialRetryDelayMillis: backoffSettings?.initialRetryDelayMillis ||
                tabular_api_surface_1.DEFAULT_BACKOFF_SETTINGS.initialRetryDelayMillis,
            retryDelayMultiplier: backoffSettings?.retryDelayMultiplier ||
                tabular_api_surface_1.DEFAULT_BACKOFF_SETTINGS.retryDelayMultiplier,
            maxRetryDelayMillis: backoffSettings?.maxRetryDelayMillis ||
                tabular_api_surface_1.DEFAULT_BACKOFF_SETTINGS.maxRetryDelayMillis,
        };
    };
    calculateTotalTimeout = () => {
        return Math.max(this.deadlineTs - Date.now(), 0);
    };
    fail = (err) => {
        if (this.state !== 'Failed' && this.state !== 'Finished') {
            this.state = 'Failed';
            this.clearTimers();
            this.callerStream.emit('error', err);
        }
    };
    createValuesStream = () => {
        const reqOpts = {
            ...this.requestParams,
            preparedQuery: this.lastPreparedStatementBytes,
            resumeToken: this.callerStream.getLatestResumeToken(),
        };
        const retryOpts = {
            currentRetryAttempt: 0,
            // Handling retries in this client.
            // Options below prevent gax from retrying.
            noResponseRetries: 0,
            shouldRetryFn: () => {
                return false;
            },
        };
        const responseStream = this.bigtable.request({
            client: 'BigtableClient',
            method: 'executeQuery',
            reqOpts,
            gaxOpts: retryOpts,
        });
        const byteBuffer = new bytebuffertransformer_1.ByteBufferTransformer(this.protoBytesEncoding);
        const rowValuesStream = pumpify.obj([responseStream, byteBuffer]);
        let aborted = false;
        const abort = () => {
            if (!aborted) {
                aborted = true;
                responseStream.abort();
            }
        };
        rowValuesStream.abort = abort;
        return rowValuesStream;
    };
    makeNewRequest = (preparedStatementBytes, metadata) => {
        if (this.valuesStream !== null) {
            // assume old streams were scrached.
            this.fail(new Error('Internal error: making a request before streams from the last one was cleaned up.'));
        }
        if (preparedStatementBytes) {
            this.lastPreparedStatementBytes = preparedStatementBytes;
        }
        if (metadata) {
            this.callerStream.updateMetadata(metadata);
        }
        this.valuesStream = this.createValuesStream();
        this.valuesStream
            .on('error', this.handleStreamError)
            .on('data', this.handleStreamData)
            .on('close', this.handleStreamEnd)
            .on('end', this.handleStreamEnd);
        this.valuesStream.pipe(this.callerStream, { end: false });
    };
    discardOldValueStream = () => {
        if (this.valuesStream) {
            this.valuesStream.abort();
            this.valuesStream.unpipe(this.callerStream);
            this.valuesStream.removeAllListeners('error');
            this.valuesStream.removeAllListeners('data');
            this.valuesStream.removeAllListeners('end');
            this.valuesStream.removeAllListeners('close');
            this.valuesStream.destroy();
            this.valuesStream = null;
        }
    };
    getNextRetryDelay = () => {
        // 0 - 100 ms jitter
        const jitter = Math.floor(Math.random() * 100);
        const calculatedNextRetryDelay = this.retryOptions.initialRetryDelayMillis *
            Math.pow(this.retryOptions.retryDelayMultiplier, this.numErrors) +
            jitter;
        return Math.min(calculatedNextRetryDelay, this.retryOptions.maxRetryDelayMillis);
    };
    clearTimers = () => {
        if (this.retryTimer) {
            clearTimeout(this.retryTimer);
            this.retryTimer = null;
        }
        if (this.timeoutTimer) {
            clearTimeout(this.timeoutTimer);
            this.timeoutTimer = null;
        }
    };
    // Transitions:
    startNextAttempt = () => {
        if (this.state === 'DrainAndRefreshQueryPlan') {
            this.state = 'AwaitingQueryPlan';
            this.preparedStatement.getData(this.handleQueryPlan, this.calculateTotalTimeout());
        }
        else if (this.state === 'DrainingBeforeResumeToken') {
            this.state = 'BeforeFirstResumeToken';
            this.makeNewRequest(this.lastPreparedStatementBytes);
        }
        else if (this.state === 'DrainingAfterResumeToken') {
            this.state = 'AfterFirstResumeToken';
            this.makeNewRequest(this.lastPreparedStatementBytes);
        }
        else {
            this.fail(new Error(`startNextAttempt can't be invoked on a current state ${this.state}`));
        }
    };
    handleDrainingDone = () => {
        if (this.state === 'DrainAndRefreshQueryPlan' ||
            this.state === 'DrainingBeforeResumeToken' ||
            this.state === 'DrainingAfterResumeToken') {
            this.retryTimer = setTimeout(this.startNextAttempt, this.getNextRetryDelay());
        }
        else {
            this.fail(new Error(`handleDrainingDone can't be invoked on a current state ${this.state}`));
        }
    };
    handleTotalTimeout = () => {
        this.discardOldValueStream();
        if (this.retryTimer) {
            clearTimeout(this.retryTimer);
            this.retryTimer = null;
        }
        this.fail(new Error('Deadline exceeded.'));
    };
    handleStreamError = (err) => {
        this.discardOldValueStream();
        if (this.retryOptions.retryCodes.has(err.code) || // retryable error
            (0, createReadStreamInternal_1.isRstStreamError)(err)) {
            // We want to make a new request only when all requests already written to the Reader by our
            // previous active request stream were processed.
            this.numErrors += 1;
            if (this.numErrors <= this.retryOptions.maxRetries) {
                if (this.state === 'AfterFirstResumeToken') {
                    this.state = 'DrainingAfterResumeToken';
                    this.callerStream.onDrain(this.handleDrainingDone);
                }
                else if (this.state === 'BeforeFirstResumeToken') {
                    this.state = 'DrainingBeforeResumeToken';
                    this.callerStream.onDrain(this.handleDrainingDone);
                }
                else {
                    this.fail(new Error(`Can't handle a stream error in the current state ${this.state}`));
                }
            }
            else {
                this.fail(new Error(`Maximum retry limit exeeded. Last error: ${err.message}`));
            }
        }
        else if ((0, retry_options_1.isExpiredQueryError)(err)) {
            if (this.state === 'AfterFirstResumeToken') {
                this.fail(new Error('Query plan expired during a retry attempt.'));
            }
            else if (this.state === 'BeforeFirstResumeToken') {
                this.state = 'DrainAndRefreshQueryPlan';
                // If the server returned the "expired query error" we mark it as expired.
                this.preparedStatement.markAsExpired();
                this.callerStream.onDrain(this.handleDrainingDone);
            }
            else {
                this.fail(new Error(`Can't handle expired query error in the current state ${this.state}`));
            }
        }
        else {
            this.fail(new Error(`Unexpected error: ${err.message}`));
        }
    };
    handleQueryPlan = (err, preparedStatementBytes, metadata) => {
        if (this.state === 'AwaitingQueryPlan') {
            if (err) {
                this.numErrors += 1;
                if (this.numErrors <= this.retryOptions.maxRetries) {
                    this.preparedStatement.getData(this.handleQueryPlan, this.calculateTotalTimeout());
                }
                else {
                    this.fail(new Error(`Failed to get query plan. Maximum retry limit exceeded. Last error: ${err.message}`));
                }
            }
            else {
                this.state = 'BeforeFirstResumeToken';
                this.makeNewRequest(preparedStatementBytes, metadata);
            }
        }
        else {
            this.fail(new Error(`handleQueryPlan can't be invoked on a current state ${this.state}`));
        }
    };
    /**
     * This method is called when the valuesStream emits data.
     * The valuesStream yelds data only after the resume token
     * is recieved, hence the state change.
     */
    handleStreamData = (data) => {
        if (this.state === 'BeforeFirstResumeToken' ||
            this.state === 'AfterFirstResumeToken') {
            this.state = 'AfterFirstResumeToken';
        }
        else {
            this.fail(new Error(`Internal Error: recieved data in an invalid state ${this.state}`));
        }
    };
    handleStreamEnd = () => {
        if (this.state === 'AfterFirstResumeToken' ||
            this.state === 'BeforeFirstResumeToken') {
            this.clearTimers();
            this.state = 'Finished';
            this.originalEnd();
        }
        else if (this.state === 'Finished') {
            // noop
        }
        else {
            this.fail(new Error(`Internal Error: Cannot handle stream end in state: ${this.state}`));
        }
    };
    /**
     * The caller should be able to call callerStream.end() to stop receiving
     * more rows and cancel the stream prematurely. However this has a side effect
     * the 'end' event will be emitted.
     * We don't want that, because it also gets emitted if the stream ended
     * normally. To tell these two situations apart, we'll overwrite the end
     * function, but save the "original" end() function which will be called
     * on valuesStream.on('end').
     */
    handleCallersEnd = (chunk, encoding, cb) => {
        if (this.state !== 'Failed' && this.state !== 'Finished') {
            this.clearTimers();
            this.discardOldValueStream();
            this.state = 'Finished';
            this.callerStream.close();
        }
        return this.callerStream;
    };
}
exports.ExecuteQueryStateMachine = ExecuteQueryStateMachine;
function createCallerStream(readerStream, resultStream, metadataConsumer, setCallerCancelled) {
    const callerStream = pumpify.obj([readerStream, resultStream]);
    callerStream.getMetadata = resultStream.getMetadata.bind(resultStream);
    callerStream.updateMetadata = metadataConsumer.consume.bind(metadataConsumer);
    callerStream.getLatestResumeToken = () => readerStream.resumeToken;
    callerStream.onDrain = readerStream.onDrain.bind(readerStream);
    callerStream.close = () => {
        setCallerCancelled(true);
        callerStream.destroy();
    };
    return callerStream;
}
//# sourceMappingURL=executequerystatemachine.js.map