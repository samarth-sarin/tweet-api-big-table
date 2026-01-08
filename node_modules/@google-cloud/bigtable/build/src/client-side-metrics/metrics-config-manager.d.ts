import { IMetricsHandler } from './metrics-handler';
import { ITabularApiSurface, OperationMetricsCollector } from './operation-metrics-collector';
import { MethodName, StreamingState } from './client-side-metrics-attributes';
/**
 * A class for tracing and recording client-side metrics related to Bigtable operations.
 */
export declare class ClientSideMetricsConfigManager {
    private metricsHandlers;
    constructor(handlers: IMetricsHandler[]);
    createOperation(methodName: MethodName, streaming: StreamingState, table: ITabularApiSurface): OperationMetricsCollector;
}
