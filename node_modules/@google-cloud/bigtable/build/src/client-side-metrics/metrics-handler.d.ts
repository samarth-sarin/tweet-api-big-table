import { MethodName, StreamingState } from './client-side-metrics-attributes';
/**
 * The interfaces below use undefined instead of null to indicate a metric is
 * not available yet. The benefit of this is that new metrics can be added
 * without requiring users to change the methods in their metrics handler.
 */
type IMetricsCollectorData = {
    instanceId: string;
    table: string;
    cluster?: string;
    zone?: string;
    app_profile?: string;
    method: MethodName;
};
interface StandardData {
    metricsCollectorData: IMetricsCollectorData;
    client_name: string;
    streaming: StreamingState;
    status: string;
}
export interface OnOperationCompleteData extends StandardData {
    firstResponseLatency?: number;
    operationLatency: number;
    applicationLatency?: number;
    retryCount?: number;
}
export interface OnAttemptCompleteData extends StandardData {
    attemptLatency: number;
    serverLatency?: number;
    connectivityErrorCount: number;
}
/**
 * An interface for handling client-side metrics related to Bigtable operations.
 * Implementations of this interface can define how metrics are recorded and processed.
 */
export interface IMetricsHandler {
    /**
     * Called when an operation completes (successfully or unsuccessfully).
     * @param {OnOperationCompleteData} data Metrics and attributes related to the completed operation.
     */
    onOperationComplete?(data: OnOperationCompleteData): void;
    /**
     * Called when an attempt (e.g., an RPC attempt) completes.
     * @param {OnAttemptCompleteData} data Metrics and attributes related to the completed attempt.
     */
    onAttemptComplete?(data: OnAttemptCompleteData): void;
}
export {};
