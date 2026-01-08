"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PreparedStatement = exports.SHOULD_REFRESH_SOON_PERIOD_MS = void 0;
const precise_date_1 = require("@google-cloud/precise-date");
const metadataconsumer_1 = require("./metadataconsumer");
const events_1 = require("events");
exports.SHOULD_REFRESH_SOON_PERIOD_MS = 1000;
/**
 * This object keeps track of the query plan a.k.a. metadata and preparedQuery bytes.
 * It provides a way of retrieving last retrieved query plan.
 * If a query plan is marked as expired, it will be refreshed.
 * You can get the query plan via the getData method.
 * If the query plan is not expired, getData will return the value immediately.
 * If the object is marked as expired, getting the query plan will wait for
 * a refresh to happen. If the refresh fails, all awaiting getData calls
 * also return an error.
 */
class PreparedStatement extends events_1.EventEmitter {
    bigtable;
    retryRequest;
    metadata;
    preparedQueryBytes;
    validUntilTimestamp;
    forcedExpiration;
    isRefreshing;
    timer;
    lastRefreshError;
    parameterTypes;
    constructor(bigtable, response, retryRequest, parameterTypes) {
        super();
        this.bigtable = bigtable;
        this.metadata = metadataconsumer_1.MetadataConsumer.parseMetadata(response.metadata);
        this.preparedQueryBytes = response.preparedQuery;
        this.validUntilTimestamp = timestampFromResponse(response);
        this.timer = null;
        this.isRefreshing = false;
        this.lastRefreshError = null;
        this.forcedExpiration = false;
        this.retryRequest = retryRequest;
        this.parameterTypes = parameterTypes;
    }
    /**
     * Returns true if the validUntilTimestamp is close,
     * meaning less than SHOULD_REFRESH_SOON_PERIOD_MS away.
     */
    shouldRefreshSoon = () => {
        if (!this.validUntilTimestamp) {
            return false;
        }
        return (Date.now() > this.validUntilTimestamp - exports.SHOULD_REFRESH_SOON_PERIOD_MS);
    };
    /**
     * Schedules the refresh. It is deffered to the next tick to ensure
     * that the current call stack is finished before a request to bigtable is made.
     */
    setupTimer = () => {
        this.timer = setTimeout(this.handleTimerEnd, 0);
    };
    discardTimer = () => {
        if (this.timer) {
            clearTimeout(this.timer);
            this.timer = null;
        }
    };
    /**
     * Performs a request to bigtable to get a refreshed query plan.
     */
    startRefreshing = () => {
        this.isRefreshing = true;
        this.bigtable.request(this.retryRequest, this.handlePrepareQueryResponse);
    };
    /**
     * Begins the refresh.
     */
    handleTimerEnd = () => {
        if (!this.isRefreshing) {
            this.discardTimer();
            this.startRefreshing();
        }
    };
    /**
     * Callback for handling the call to bigtable.
     */
    handlePrepareQueryResponse = (err, response) => {
        if (this.isRefreshing) {
            this.isRefreshing = false;
            this.discardTimer();
            if (err) {
                this.lastRefreshError = err;
                this.emit('refreshDone');
            }
            else {
                try {
                    this.lastRefreshError = null;
                    this.forcedExpiration = false;
                    this.validUntilTimestamp = timestampFromResponse(response);
                    this.metadata = metadataconsumer_1.MetadataConsumer.parseMetadata(response.metadata);
                    this.preparedQueryBytes = response.preparedQuery;
                }
                catch (err) {
                    this.lastRefreshError = err;
                }
                this.emit('refreshDone');
            }
        }
        else {
            const err = new Error('Invalid state: PrepareQueryResponse recieved when not refreshing.');
            console.error(err);
            throw err;
        }
    };
    /**
     * Invoked when the query plan is retrieved from this object.
     */
    scheduleRefreshIfNeeded = () => {
        if (!this.isRefreshing && this.timer === null) {
            if (this.isExpired() || this.shouldRefreshSoon()) {
                this.setupTimer();
            } // else noop
        } // else noop
    };
    /**
     * This function should be called, when the server returns
     * the FAILED_PRECONDITION error saying the query plan
     * is expired. For more info refer to the ExecuteQueryStateMachine.
     */
    markAsExpired = () => {
        this.forcedExpiration = true;
    };
    /**
     * Used for retrieveing the query plan (preparedQuery bytes and metadata)
     * @param callback called when query plan is available
     * @param timeoutMs when callback should be called with an error.
     */
    getData = (callback, timeoutMs) => {
        this.scheduleRefreshIfNeeded();
        if (this.isExpired()) {
            const listener = new CallbackWithTimeout(callback, timeoutMs);
            this.once('refreshDone', () => {
                // If there are many listeners, the query plan could have expired again
                // before we got to processing this one, so we have to check it again.
                if (this.isExpired() || this.lastRefreshError) {
                    listener.tryInvoke(this.lastRefreshError ||
                        new Error('Getting a fresh query plan failed.'), undefined, undefined);
                }
                else {
                    listener.tryInvoke(undefined, this.preparedQueryBytes, this.metadata);
                }
            });
        }
        else {
            // for the sake of consistency we should call the callback asynchornously
            // regardless if the plan needs refreshing or not.
            setTimeout(() => callback(undefined, this.preparedQueryBytes, this.metadata), 0);
        }
    };
    /**
     * @returns parameter types used to create the query plan
     */
    getParameterTypes = () => this.parameterTypes;
    /**
     * @returns true if the object has been marked as expired.
     */
    isExpired = () => {
        return this.forcedExpiration;
    };
}
exports.PreparedStatement = PreparedStatement;
/**
 * This class makes sure the callback is called only once.
 * If the timeout expired, the callback is called with a "Timeout Expired" error.
 * Otherwise it is called with provided args.
 */
class CallbackWithTimeout {
    callback;
    timer;
    isValid;
    constructor(callback, timeout) {
        this.callback = callback;
        this.isValid = true;
        this.timer = setTimeout(() => {
            this.tryInvoke(new Error('Deadline Exceeded waiting for prepared statement to refresh.'));
        }, timeout);
    }
    /**
     * If this object has not yet been invalidated, the callback is called.
     * @param args
     */
    tryInvoke(...args) {
        if (!this.isValid || !this.callback) {
            return;
        }
        const callback = this.callback;
        this.invalidate();
        callback(...args);
    }
    /**
     * After this method is called, the callback can no longer be invoked.
     */
    invalidate() {
        if (this.timer) {
            clearTimeout(this.timer);
            this.timer = null;
        }
        this.callback = null;
        this.isValid = false;
    }
}
function timestampFromResponse(response) {
    if (!response.validUntil?.seconds) {
        return null;
    }
    return new precise_date_1.PreciseDate({
        seconds: response.validUntil?.seconds ?? undefined,
        nanos: response.validUntil?.nanos ?? undefined,
    }).getTime();
}
//# sourceMappingURL=preparedstatement.js.map