"use strict";
// Copyright 2025 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientSideMetricsConfigManager = void 0;
const operation_metrics_collector_1 = require("./operation-metrics-collector");
/**
 * A class for tracing and recording client-side metrics related to Bigtable operations.
 */
class ClientSideMetricsConfigManager {
    metricsHandlers;
    constructor(handlers) {
        this.metricsHandlers = handlers;
    }
    createOperation(methodName, streaming, table) {
        return new operation_metrics_collector_1.OperationMetricsCollector(table, methodName, streaming, this.metricsHandlers);
    }
}
exports.ClientSideMetricsConfigManager = ClientSideMetricsConfigManager;
//# sourceMappingURL=metrics-config-manager.js.map