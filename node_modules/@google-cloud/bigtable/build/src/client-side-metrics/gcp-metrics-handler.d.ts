import { IMetricsHandler, OnAttemptCompleteData, OnOperationCompleteData } from './metrics-handler';
import { ClientOptions } from 'google-gax';
/**
 * A metrics handler implementation that uses OpenTelemetry to export metrics to Google Cloud Monitoring.
 * This handler records metrics such as operation latency, attempt latency, retry count, and more,
 * associating them with relevant attributes for detailed analysis in Cloud Monitoring.
 */
export declare class GCPMetricsHandler implements IMetricsHandler {
    private otelInstruments;
    private clientUid;
    /**
     * The `GCPMetricsHandler` is responsible for managing and recording
     * client-side metrics for Google Cloud Bigtable using OpenTelemetry. It
     * handles the creation and configuration of various metric instruments
     * (histograms and counters) and exports them to Google Cloud Monitoring
     * through the provided `PushMetricExporter`.
     *
     */
    constructor(options: ClientOptions);
    /**
     * Records metrics for a completed Bigtable operation.
     * This method records the operation latency and retry count, associating them with provided attributes.
     * @param {OnOperationCompleteData} data Data related to the completed operation.
     */
    onOperationComplete(data: OnOperationCompleteData): void;
    /**
     * Records metrics for a completed attempt of a Bigtable operation.
     * This method records attempt latency, connectivity error count, server latency,
     * along with the provided attributes.
     * @param {OnAttemptCompleteData} data Data related to the completed attempt.
     */
    onAttemptComplete(data: OnAttemptCompleteData): void;
}
