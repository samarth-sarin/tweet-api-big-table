import { MetricExporter } from '@google-cloud/opentelemetry-cloud-monitoring-exporter';
import { ResourceMetrics } from '@opentelemetry/sdk-metrics';
import { ClientOptions } from 'google-gax';
export interface ExportResult {
    code: number;
}
/**
 * Converts OpenTelemetry metrics data into a format suitable for the Google Cloud
 * Monitoring API's `createTimeSeries` method.
 *
 * This function transforms the structured metrics data, including resource and
 * metric attributes, data points, and aggregation information, into an object
 * that conforms to the expected request format of the Cloud Monitoring API.
 *
 * @param projectId
 * @param {ResourceMetrics} exportArgs - The OpenTelemetry metrics data to be converted. This
 *   object contains resource attributes, scope information, and a list of
 *   metrics with their associated data points.
 *
 * @returns An object representing a `CreateTimeSeriesRequest`, ready for sending
 *   to the Google Cloud Monitoring API. This object contains the project name
 *   and an array of time series data points, formatted for ingestion by
 *   Cloud Monitoring.
 *
 * @throws Will throw an error if there are issues converting the data.
 *
 * @remarks
 *   The output format is specific to the Cloud Monitoring API and involves
 *   mapping OpenTelemetry concepts to Cloud Monitoring's data model, including:
 *   - Mapping resource attributes to resource labels.
 *   - Mapping metric attributes to metric labels.
 *   - Handling different metric types (counter, distribution).
 *   - Converting data points to the correct structure, including start and end
 *     times, values, and bucket information for distributions.
 *
 * @example
 *   const exportInput: ExportInput = { ... }; // Example ExportInput object
 *   const monitoringRequest = metricsToRequest(exportInput);
 *   // monitoringRequest can now be used in monitoringClient.createTimeSeries(monitoringRequest)
 *
 *
 */
export declare function metricsToRequest(projectId: string, exportArgs: ResourceMetrics): {
    name: string;
    timeSeries: ({
        metric: {
            type: string;
            labels: {
                method: import("@opentelemetry/api").AttributeValue | undefined;
                client_uid: import("@opentelemetry/api").AttributeValue | undefined;
                client_name: import("@opentelemetry/api").AttributeValue | undefined;
            } & {
                status: string | number | true | (string | null | undefined)[] | (number | null | undefined)[] | (boolean | null | undefined)[];
            } & {
                streaming: string | number | true | (string | null | undefined)[] | (number | null | undefined)[] | (boolean | null | undefined)[];
            } & {
                app_profile: string | number | true | (string | null | undefined)[] | (number | null | undefined)[] | (boolean | null | undefined)[];
            };
        };
        resource: {
            type: string;
            labels: {
                cluster: import("@opentelemetry/api").AttributeValue | undefined;
                instance: import("@opentelemetry/api").AttributeValue | undefined;
                project_id: string;
                table: import("@opentelemetry/api").AttributeValue | undefined;
                zone: import("@opentelemetry/api").AttributeValue | undefined;
            };
        };
        valueType: string;
        points: {
            interval: {
                endTime: {
                    seconds: number;
                    nanos: number;
                };
                startTime: {
                    seconds: number;
                    nanos: number;
                };
            };
            value: {
                int64Value: number;
            };
        }[];
        metricKind?: undefined;
        unit?: undefined;
    } | {
        metric: {
            type: string;
            labels: {
                method: import("@opentelemetry/api").AttributeValue | undefined;
                client_uid: import("@opentelemetry/api").AttributeValue | undefined;
                client_name: import("@opentelemetry/api").AttributeValue | undefined;
            } & {
                status: string | number | true | (string | null | undefined)[] | (number | null | undefined)[] | (boolean | null | undefined)[];
            } & {
                streaming: string | number | true | (string | null | undefined)[] | (number | null | undefined)[] | (boolean | null | undefined)[];
            } & {
                app_profile: string | number | true | (string | null | undefined)[] | (number | null | undefined)[] | (boolean | null | undefined)[];
            };
        };
        resource: {
            type: string;
            labels: {
                cluster: import("@opentelemetry/api").AttributeValue | undefined;
                instance: import("@opentelemetry/api").AttributeValue | undefined;
                project_id: string;
                table: import("@opentelemetry/api").AttributeValue | undefined;
                zone: import("@opentelemetry/api").AttributeValue | undefined;
            };
        };
        metricKind: string;
        valueType: string;
        points: {
            interval: {
                endTime: {
                    seconds: number;
                    nanos: number;
                };
                startTime: {
                    seconds: number;
                    nanos: number;
                };
            };
            value: {
                distributionValue: {
                    count: string;
                    mean: number;
                    bucketOptions: {
                        explicitBuckets: {
                            bounds: number[];
                        };
                    };
                    bucketCounts: string[];
                };
            };
        }[];
        unit: string;
    })[];
};
/**
 * A custom OpenTelemetry `MetricExporter` that sends metrics data to Google Cloud
 * Monitoring.
 *
 * This class extends the base `MetricExporter` from `@google-cloud/opentelemetry-cloud-monitoring-exporter`
 * and handles the process of converting OpenTelemetry metrics data into the
 * format required by the Google Cloud Monitoring API. It uses the
 * `MetricServiceClient` to send the data to Google Cloud Monitoring's
 * `createTimeSeries` method.
 *
 * @remarks
 *   This exporter relies on the `metricsToRequest` function to perform the
 *   necessary transformation of OpenTelemetry metrics into Cloud Monitoring
 *   `TimeSeries` data.
 *
 *   The exporter is asynchronous and will not block the calling thread while
 *   sending metrics. It manages the Google Cloud Monitoring client and handles
 *   potential errors during the export process.
 *
 *   The class expects the `ResourceMetrics` to have been correctly configured
 *   and populated with the required resource attributes to correctly identify
 *   the monitored resource in Cloud Monitoring.
 *
 * @example
 *   // Create an instance of the CloudMonitoringExporter
 *   const exporter = new CloudMonitoringExporter();
 *
 *   // Use the exporter with a MeterProvider
 *   const meterProvider = new MeterProvider({
 *     resource: new Resource({
 *       'service.name': 'my-service',
 *       // ... other resource attributes
 *     }),
 *     readers: [new PeriodicExportingMetricReader({
 *         exporter: exporter,
 *         exportIntervalMillis: 10000 // Export every 10 seconds
 *     })]
 *   });
 *
 *   // Now start instrumenting your application using the meter
 *   const meter = meterProvider.getMeter('my-meter');
 *   // ... create counters, histograms, etc.
 *
 * @beta
 */
export declare class CloudMonitoringExporter extends MetricExporter {
    private client;
    constructor(options: ClientOptions);
    export(metrics: ResourceMetrics, resultCallback: (result: ExportResult) => void): Promise<void>;
}
