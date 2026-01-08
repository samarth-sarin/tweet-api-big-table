import { MethodName, StreamingState } from './client-side-metrics-attributes';
import { grpc } from 'google-gax';
import { AbortableDuplex, BigtableOptions } from '../index';
import { IMetricsHandler } from './metrics-handler';
import { TimedStream } from '../timed-stream';
/**
 * An interface representing a tabular API surface, such as a Bigtable table.
 */
export interface ITabularApiSurface {
    instance: {
        id: string;
    };
    id: string;
    bigtable: {
        metricsEnabled?: boolean;
        projectId?: string;
        appProfileId?: string;
        options: BigtableOptions;
    };
}
/**
 * A class for tracing and recording client-side metrics related to Bigtable operations.
 */
export declare class OperationMetricsCollector {
    private readonly INSTANCE_INFORMATION_KEY;
    private state;
    private operationStartTime;
    private attemptStartTime;
    private zone;
    private cluster;
    private tabularApiSurface;
    private methodName;
    private attemptCount;
    private firstResponseLatency;
    private serverTimeRead;
    private serverTime;
    private connectivityErrorCount;
    private streamingOperation;
    private handlers;
    userStream?: TimedStream;
    /**
     * @param {ITabularApiSurface} tabularApiSurface Information about the Bigtable table being accessed.
     * @param {MethodName} methodName The name of the method being traced.
     * @param {StreamingState} streamingOperation Whether or not the call is a streaming operation.
     * @param {IMetricsHandler[]} handlers The metrics handlers used to store the record the metrics.
     */
    constructor(tabularApiSurface: ITabularApiSurface, methodName: MethodName, streamingOperation: StreamingState, handlers: IMetricsHandler[]);
    private getMetricsCollectorData;
    /**
     * Called to add handlers to the stream so that we can observe
     * header and trailer data for client side metrics.
     *
     * @param stream
     */
    wrapRequest(stream: AbortableDuplex): void;
    /**
     * Called when the operation starts. Records the start time.
     */
    onOperationStart(): void;
    /**
     * Called when an attempt (e.g., an RPC attempt) completes. Records attempt latencies.
     * @param {grpc.status} attemptStatus The grpc status for the attempt.
     */
    onAttemptComplete(attemptStatus: grpc.status): void;
    /**
     * Called when a new attempt starts. Records the start time of the attempt.
     */
    onAttemptStart(): void;
    /**
     * Called when the first response is received. Records first response latencies.
     */
    onResponse(): void;
    /**
     * Called when an operation completes (successfully or unsuccessfully).
     * Records operation latencies, retry counts, and connectivity error counts.
     * @param {grpc.status} finalOperationStatus Information about the completed operation.
     * @param {number} applicationLatency The application latency measurement.
     */
    onOperationComplete(finalOperationStatus: grpc.status, applicationLatency?: number): void;
    /**
     * Called when metadata is received. Extracts server timing information if available.
     * @param {object} metadata The received metadata.
     */
    onMetadataReceived(metadata: {
        internalRepr: Map<string, string[]>;
        options: {};
    }): void;
    /**
     * Called when status information is received. Extracts zone and cluster information.
     * @param {object} status The received status information.
     */
    onStatusMetadataReceived(status: {
        metadata: {
            internalRepr: Map<string, Uint8Array[]>;
            options: {};
        };
    }): void;
}
