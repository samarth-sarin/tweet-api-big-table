import { GetRowsOptions } from '../table';
import { ServiceError } from 'google-gax';
import { TabularApiSurface } from '../tabular-api-surface';
import { OperationMetricsCollector } from '../client-side-metrics/operation-metrics-collector';
import { TimedStream } from '../timed-stream';
/**
 * Creates a readable stream of rows from a Bigtable table or authorized view.
 *
 * This internal method handles the core logic for streaming rows from a Bigtable
 * table. It supports various filtering, limiting, and retry mechanisms. It can
 * be used to create a stream for either a whole table or an authorized view.
 *
 * @param {Table} table The Table instance to read rows from.
 * @param metricsCollector
 * @param {GetRowsOptions} [opts] Optional configuration for the read operation.
 * @param {boolean} [opts.decode=true] If set to `false` it will not decode
 *     Buffer values returned from Bigtable.
 * @param {boolean} [opts.encoding] The encoding to use when converting
 *     Buffer values to a string.
 * @param {string} [opts.end] End value for key range.
 * @param {Filter} [opts.filter] Row filters allow you to
 *     both make advanced queries and format how the data is returned.
 * @param {object} [opts.gaxOptions] Request configuration options, outlined
 *     here: https://googleapis.github.io/gax-nodejs/CallSettings.html.
 * @param {string[]} [opts.keys] A list of row keys.
 * @param {number} [opts.limit] Maximum number of rows to be returned.
 * @param {string} [opts.prefix] Prefix that the row key must match.
 * @param {string[]} [opts.prefixes] List of prefixes that a row key must
 *     match.
 * @param {object[]} [opts.ranges] A list of key ranges.
 * @param {string} [opts.start] Start value for key range.
 * @returns {stream} A readable stream of {@link Row} objects.
 *
 */
export declare function createReadStreamInternal(table: TabularApiSurface, metricsCollector: OperationMetricsCollector, opts?: GetRowsOptions): TimedStream;
export declare function isRstStreamError(error: ServiceError): boolean;
