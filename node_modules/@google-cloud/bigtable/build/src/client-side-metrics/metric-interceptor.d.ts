import { CallOptions } from 'google-gax';
import { OperationMetricsCollector } from './operation-metrics-collector';
export type ServerStatus = {
    metadata: {
        internalRepr: Map<string, Uint8Array[]>;
        options: {};
    };
    code: number;
    details: string;
};
/**
 * Attaches a metrics interceptor to unary calls for collecting client-side metrics.
 *
 * This method modifies the given `gaxOptions` to include an interceptor that
 * will be triggered during the execution of a unary gRPC call. The interceptor
 * uses the provided `OperationMetricsCollector` to record various metrics
 * related to the call, such as latency, retries, and errors.
 *
 * @param {CallOptions} gaxOptions The existing GAX call options to modify.
 * @param {OperationMetricsCollector} metricsCollector The metrics collector
 *   for the operation.
 * @returns {CallOptions} The modified `gaxOptions` with the interceptor attached.
 */
export declare function createMetricsUnaryInterceptorProvider(gaxOptions: CallOptions, metricsCollector?: OperationMetricsCollector): CallOptions;
