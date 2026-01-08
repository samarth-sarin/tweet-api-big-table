import { Instance } from './instance';
import { Bigtable, Entry, MutateOptions, SampleRowKeysCallback, SampleRowsKeysResponse } from './index';
import { BoundData, RawFilter } from './filter';
import { Row } from './row';
import { BackoffSettings } from 'google-gax/build/src/gax';
import { google } from '../protos/protos';
import { CallOptions, ServiceError } from 'google-gax';
import { GoogleInnerError } from './table';
export declare const RETRYABLE_STATUS_CODES: Set<number>;
export declare const IGNORED_STATUS_CODES: Set<number>;
export declare const DEFAULT_BACKOFF_SETTINGS: BackoffSettings;
export type InsertRowsCallback = (err: ServiceError | PartialFailureError | null, apiResponse?: google.protobuf.Empty) => void;
export type InsertRowsResponse = [google.protobuf.Empty];
export type MutateCallback = (err: ServiceError | PartialFailureError | null, apiResponse?: google.protobuf.Empty) => void;
export type MutateResponse = [google.protobuf.Empty];
export interface GetRowsOptions {
    /**
     * If set to `false` it will not decode Buffer values returned from Bigtable.
     */
    decode?: boolean;
    /**
     * The encoding to use when converting Buffer values to a string.
     */
    encoding?: string;
    /**
     * End value for key range.
     */
    end?: string;
    /**
     * Row filters allow you to both make advanced queries and format how the data is returned.
     */
    filter?: RawFilter;
    /**
     * Request configuration options, outlined here: https://googleapis.github.io/gax-nodejs/CallSettings.html.
     */
    gaxOptions?: CallOptions;
    /**
     * A list of row keys.
     */
    keys?: string[];
    /**
     * Maximum number of rows to be returned.
     */
    limit?: number;
    /**
     * Prefix that the row key must match.
     */
    prefix?: string;
    /**
     * List of prefixes that a row key must match.
     */
    prefixes?: string[];
    /**
     * A list of key ranges.
     */
    ranges?: PrefixRange[];
    /**
     * Start value for key range.
     */
    start?: string;
}
export type GetRowsCallback = (err: ServiceError | null, rows?: Row[], apiResponse?: google.bigtable.v2.ReadRowsResponse) => void;
export type GetRowsResponse = [Row[], google.bigtable.v2.ReadRowsResponse];
export interface PrefixRange {
    start?: BoundData | string;
    end?: BoundData | string;
}
export interface PrefixRange {
    start?: BoundData | string;
    end?: BoundData | string;
}
/**
 * The TabularApiSurface class is a class that contains methods we want to
 * expose on both tables and authorized views. It also contains data that will
 * be used by both Authorized views and Tables for these shared methods.
 *
 * @class
 * @param {Instance} instance Instance Object.
 * @param {string} id Unique identifier of the table.
 *
 */
export declare class TabularApiSurface {
    bigtable: Bigtable;
    instance: Instance;
    name: string;
    id: string;
    metadata?: google.bigtable.admin.v2.ITable;
    maxRetries?: number;
    viewName?: string;
    protected constructor(instance: Instance, id: string, viewName?: string);
    /**
     * Get {@link Row} objects for the rows currently in your table as a
     * readable object stream.
     *
     * @param {boolean} [options.decode=true] If set to `false` it will not decode
     *     Buffer values returned from Bigtable.
     * @param {boolean} [options.encoding] The encoding to use when converting
     *     Buffer values to a string.
     * @param {string} [options.end] End value for key range.
     * @param {Filter} [options.filter] Row filters allow you to
     *     both make advanced queries and format how the data is returned.
     * @param {object} [options.gaxOptions] Request configuration options, outlined
     *     here: https://googleapis.github.io/gax-nodejs/CallSettings.html.
     * @param {string[]} [options.keys] A list of row keys.
     * @param {number} [options.limit] Maximum number of rows to be returned.
     * @param {string} [options.prefix] Prefix that the row key must match.
     * @param {string[]} [options.prefixes] List of prefixes that a row key must
     *     match.
     * @param {object[]} [options.ranges] A list of key ranges.
     * @param {string} [options.start] Start value for key range.
     * @returns {stream}
     *
     * @example <caption>include:samples/api-reference-doc-snippets/table.js</caption>
     * region_tag:bigtable_api_table_readstream
     * @param opts
     */
    createReadStream(opts?: GetRowsOptions): import("./timed-stream").TimedStream;
    getRows(options?: GetRowsOptions): Promise<GetRowsResponse>;
    getRows(options: GetRowsOptions, callback: GetRowsCallback): void;
    getRows(callback: GetRowsCallback): void;
    insert(entries: Entry | Entry[], gaxOptions?: CallOptions): Promise<InsertRowsResponse>;
    insert(entries: Entry | Entry[], gaxOptions: CallOptions, callback: InsertRowsCallback): void;
    insert(entries: Entry | Entry[], callback: InsertRowsCallback): void;
    mutate(entries: Entry | Entry[], options?: MutateOptions): Promise<MutateResponse>;
    mutate(entries: Entry | Entry[], options: MutateOptions, callback: MutateCallback): void;
    mutate(entries: Entry | Entry[], callback: MutateCallback): void;
    /**
     * Get a reference to a table row.
     *
     * @throws {error} If a key is not provided.
     *
     * @param {string} key The row key.
     * @returns {Row}
     *
     * @example
     * ```
     * const row = table.row('lincoln');
     * ```
     */
    row(key: string): Row;
    sampleRowKeys(gaxOptions?: CallOptions): Promise<SampleRowsKeysResponse>;
    sampleRowKeys(gaxOptions: CallOptions, callback: SampleRowKeysCallback): void;
    sampleRowKeys(callback?: SampleRowKeysCallback): void;
    /**
     * Returns a sample of row keys in the table as a readable object stream.
     *
     * See {@link Table#sampleRowKeys} for more details.
     *
     * @param {object} [gaxOptions] Request configuration options, outlined here:
     *     https://googleapis.github.io/gax-nodejs/CallSettings.html.
     * @returns {stream}
     *
     * @example
     * ```
     * table.sampleRowKeysStream()
     *   .on('error', console.error)
     *   .on('data', function(key) {
     *     // Do something with the `key` object.
     *   });
     *
     * //-
     * // If you anticipate many results, you can end a stream early to prevent
     * // unnecessary processing.
     * //-
     * table.sampleRowKeysStream()
     *   .on('data', function(key) {
     *     this.end();
     *   });
     * ```
     */
    sampleRowKeysStream(gaxOptions?: CallOptions): any;
}
export declare function getNextDelay(numConsecutiveErrors: number, config: BackoffSettings): number;
export declare function populateAttemptHeader(attempt: number, gaxOpts?: CallOptions): CallOptions;
export declare class PartialFailureError extends Error {
    errors?: GoogleInnerError[];
    constructor(errors: GoogleInnerError[], rpcError?: ServiceError | null);
}
