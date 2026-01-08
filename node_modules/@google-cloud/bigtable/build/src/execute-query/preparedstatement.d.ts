import { Bigtable } from '..';
import * as SqlTypes from './types';
import { google } from '../../protos/protos';
import { EventEmitter } from 'events';
import { CallOptions } from 'google-gax';
export declare const SHOULD_REFRESH_SOON_PERIOD_MS = 1000;
export type PreparedStatementDataCallback = (err?: Error, preparedQueryBytes?: Uint8Array | string, metadata?: SqlTypes.ResultSetMetadata) => void;
interface IRetryRequest {
    client: string;
    method: string;
    reqOpts: google.bigtable.v2.IPrepareQueryRequest;
    retryOpts?: CallOptions;
}
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
export declare class PreparedStatement extends EventEmitter {
    private bigtable;
    private retryRequest;
    private metadata;
    private preparedQueryBytes;
    private validUntilTimestamp;
    private forcedExpiration;
    private isRefreshing;
    private timer;
    private lastRefreshError;
    private parameterTypes;
    constructor(bigtable: Bigtable, response: google.bigtable.v2.PrepareQueryResponse, retryRequest: IRetryRequest, parameterTypes: {
        [param: string]: SqlTypes.Type;
    });
    /**
     * Returns true if the validUntilTimestamp is close,
     * meaning less than SHOULD_REFRESH_SOON_PERIOD_MS away.
     */
    private shouldRefreshSoon;
    /**
     * Schedules the refresh. It is deffered to the next tick to ensure
     * that the current call stack is finished before a request to bigtable is made.
     */
    private setupTimer;
    private discardTimer;
    /**
     * Performs a request to bigtable to get a refreshed query plan.
     */
    private startRefreshing;
    /**
     * Begins the refresh.
     */
    private handleTimerEnd;
    /**
     * Callback for handling the call to bigtable.
     */
    private handlePrepareQueryResponse;
    /**
     * Invoked when the query plan is retrieved from this object.
     */
    private scheduleRefreshIfNeeded;
    /**
     * This function should be called, when the server returns
     * the FAILED_PRECONDITION error saying the query plan
     * is expired. For more info refer to the ExecuteQueryStateMachine.
     */
    markAsExpired: () => void;
    /**
     * Used for retrieveing the query plan (preparedQuery bytes and metadata)
     * @param callback called when query plan is available
     * @param timeoutMs when callback should be called with an error.
     */
    getData: (callback: PreparedStatementDataCallback, timeoutMs: number) => void;
    /**
     * @returns parameter types used to create the query plan
     */
    getParameterTypes: () => {
        [param: string]: SqlTypes.Type;
    };
    /**
     * @returns true if the object has been marked as expired.
     */
    isExpired: () => boolean;
}
export {};
