import { Entry, MutateCallback, MutateOptions } from '../table';
import { OperationMetricsCollector } from '../client-side-metrics/operation-metrics-collector';
import { TabularApiSurface } from '../tabular-api-surface';
export declare function mutateInternal(table: TabularApiSurface, metricsCollector: OperationMetricsCollector, entriesRaw: Entry | Entry[], optionsOrCallback?: MutateOptions | MutateCallback, cb?: MutateCallback): void;
