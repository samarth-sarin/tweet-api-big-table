import { PreparedStatement } from './preparedstatement';
import { Bigtable } from '..';
import { RetryOptions } from 'google-gax';
import * as SqlTypes from './types';
import { ExecuteQueryStreamWithMetadata } from './values';
import { ProtobufReaderTransformer } from './protobufreadertransformer';
import { MetadataConsumer } from './metadataconsumer';
/**
 * Creates a stream with some additional functionalities used by
 * the ExecuteQueryStateMachine.
 */
interface CallerStream extends ExecuteQueryStreamWithMetadata {
    /**
     * Sets the metadata used to parse the executeQuery responses.
     */
    updateMetadata: (metadata: SqlTypes.ResultSetMetadata) => void;
    /**
     * @returns the latest resumeToken before which all data was processed.
     */
    getLatestResumeToken: () => Uint8Array | string | null;
    /**
     * @param callback guaranteed to be called *after* the last message
     * was processed.
     */
    onDrain: (callback: () => void) => void;
    /**
     * No other data event will be emitted after this method is called.
     */
    close: () => void;
    /**
     * keeps a reference to the state machine.
     */
    _stateMachine: ExecuteQueryStateMachine;
}
export type State = 
/**
 * This is the starting state. When the executeQuery starts we try to
 * fetch the query plan from the PreparedStatement object. It is done via a callback
 * If the query plan is expired, it might take time to refresh and the callback
 * won't be called immediately.
 */
'AwaitingQueryPlan'
/**
 * We may have recieved some data from the server, but no resumeToken has beed reached.
 * This is an important distinction, because before the resumeToken, if the server
 * returns an "expired query plan" error, we can still try to refresh it.
 */
 | 'BeforeFirstResumeToken'
/**
 * After the first resumeToken has been reached, we can't refresh the query plan,
 * because the schema could have changed in the mean time. This would cause the
 * new rows to be parsed differently than the previous ones. That's why, in this
 * state, we treat the "expired query plan" error as non-retryable.
 */
 | 'AfterFirstResumeToken'
/**
 * When we need to properly dispose of the* old responseStream and buteBuffer, we
 * enter a "Draining..." state. Depending on what we want to do next, we have
 * DrainAndRefreshQueryPlan - moves to AwaitingQueryPlan after draining completed
 * DrainingBeforeResumeToken - moves to BeforeFirstResumeToken after draining completed
 * DrainingAfterResumeToken - moves to AfterFirstResumeToken after draining completed
 *
 * We want to make a new request only when all requests already written to the Reader
 * by our previous active request stream were processed.
 *
 * For simplicity, we will drop the previous Bigtable stream and ByteBuffer transform
 * and recreate them. We could also keep the ByteBuffer alive, but that would require
 * us to clean up its internal state and still wait for the entire buffer to be
 * read—just one step upstream.
 *
 * Please note that we cannot use gax's built-in streaming retries, as we have no way
 * of informing it that we'd like to wait for an event before retrying. An alternative
 * approach would be to purge all buffers of all streams before making a request, but
 * there is no standard API for that. Additionally, this would not help us with gax,
 * as we cannot traverse all streams upstream of our ByteBuffer to purge their buffers,
 * nor can we rely on implementation details.
 *
 * We cannot simply wait until all events are processed by ByteBuffer's _transform() method,
 * as there might still be events left in ByteBuffer's readable buffer that we do not want
 * to discard.
 *
 * Our solution is to wait until all events in the Reader's writable buffer are processed
 * and use the last resumeToken seen by the Reader to make a new request.
 *
 * We will detach (unpipe) the ByteBuffer from the Reader and wait until all requests
 * written to theReader by the ByteBuffer are processed using the _transform() method.
 * This ensures that all events written before detachment are handled by _transform(),
 * and the last resumption token seen by the Reader is the correct one to use.
 *
 * Thus, we will wait for the buffer to clear before making a new request and use the
 * last resumeToken seen by the Reader to determine the correct token for the retry request.
 *
 * This guarantees that no responses will be lost—everything processed by the
 * Reader's `_transform()` method has been pushed to the caller and won't be discarded.
 * Additionally, no duplicates will occur, as no more responses will be seen by `_transform()`
 * until a new request is made.
 */
 | 'DrainAndRefreshQueryPlan'
/**
 * Moves to BeforeFirstResumeToken after draining. For more info see 'DrainAndRefreshQueryPlan' state.
 */
 | 'DrainingBeforeResumeToken'
/**
 * Moves to AfterFirstResumeToken after draining. For more info see 'DrainAndRefreshQueryPlan' state.
 */
 | 'DrainingAfterResumeToken'
/**
 * This state indicates that the stream has finished without error.
 */
 | 'Finished'
/**
 * This state indicates that a non-retryable error occured and the stream
 * cannot be recovered.
 */
 | 'Failed';
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
export declare class ExecuteQueryStateMachine {
    private bigtable;
    private callerStream;
    private originalEnd;
    private retryOptions;
    private valuesStream;
    private requestParams;
    private lastPreparedStatementBytes?;
    private preparedStatement;
    private state;
    private deadlineTs;
    private protoBytesEncoding?;
    private numErrors;
    private retryTimer;
    private timeoutTimer;
    constructor(bigtable: Bigtable, callerStream: CallerStream, preparedStatement: PreparedStatement, requestParams: any, retryOptions?: Partial<RetryOptions> | null, protoBytesEncoding?: BufferEncoding);
    private parseRetryOptions;
    private calculateTotalTimeout;
    private fail;
    private createValuesStream;
    private makeNewRequest;
    private discardOldValueStream;
    private getNextRetryDelay;
    private clearTimers;
    private startNextAttempt;
    private handleDrainingDone;
    private handleTotalTimeout;
    private handleStreamError;
    private handleQueryPlan;
    /**
     * This method is called when the valuesStream emits data.
     * The valuesStream yelds data only after the resume token
     * is recieved, hence the state change.
     */
    private handleStreamData;
    private handleStreamEnd;
    /**
     * The caller should be able to call callerStream.end() to stop receiving
     * more rows and cancel the stream prematurely. However this has a side effect
     * the 'end' event will be emitted.
     * We don't want that, because it also gets emitted if the stream ended
     * normally. To tell these two situations apart, we'll overwrite the end
     * function, but save the "original" end() function which will be called
     * on valuesStream.on('end').
     */
    private handleCallersEnd;
}
export declare function createCallerStream(readerStream: ProtobufReaderTransformer, resultStream: ExecuteQueryStreamWithMetadata, metadataConsumer: MetadataConsumer, setCallerCancelled: (v: boolean) => void): CallerStream;
export {};
