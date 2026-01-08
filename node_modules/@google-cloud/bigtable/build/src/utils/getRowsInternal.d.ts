import { GetRowsCallback, GetRowsOptions, GetRowsResponse, TabularApiSurface } from '../tabular-api-surface';
import { OperationMetricsCollector } from '../client-side-metrics/operation-metrics-collector';
/**
 * Get {@link Row} objects for the rows currently in your table.
 *
 * This method is not recommended for large datasets as it will buffer all rows
 * before returning the results. Instead we recommend using the streaming API
 * via {@link Table#createReadStream}.
 *
 * @param {TabularApiSurface} table The table instance to get rows from.
 * @param metricsCollector
 * @param {object} [optionsOrCallback] Configuration object. See
 *     {@link Table#createReadStream} for a complete list of options.
 * @param {object} [optionsOrCallback.gaxOptions] Request configuration options, outlined
 *     here: https://googleapis.github.io/gax-nodejs/CallSettings.html.
 * @param {function} cb The callback function.
 * @param {?error} cb.err An error returned while making this request.
 * @param {Row[]} cb.rows List of Row objects.
 *
 * @returns {Promise<GetRowsResponse>|void} Returns a promise that resolves with the rows if no callback is provided, otherwise calls the callback with the rows.
 *
 * @example <caption>include:samples/api-reference-doc-snippets/table.js</caption>
 * region_tag:bigtable_api_get_rows
 */
export declare function getRowsInternal(table: TabularApiSurface, metricsCollector: OperationMetricsCollector, optionsOrCallback?: GetRowsOptions | GetRowsCallback, cb?: GetRowsCallback): void | Promise<GetRowsResponse>;
