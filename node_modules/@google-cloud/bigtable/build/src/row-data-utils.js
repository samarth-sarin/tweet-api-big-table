"use strict";
// Copyright 2024 Google LLC
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
exports.RowDataUtils = void 0;
const operation_metrics_collector_1 = require("./client-side-metrics/operation-metrics-collector");
const dotProp = require('dot-prop');
const filter_1 = require("./filter");
const mutation_1 = require("./mutation");
const arrify = require("arrify");
const client_side_metrics_attributes_1 = require("./client-side-metrics/client-side-metrics-attributes");
const metric_interceptor_1 = require("./client-side-metrics/metric-interceptor");
/**
 * RowDataUtils is a class containing functionality needed by the Row and
 * AuthorizedView classes. Its static methods need to be contained in a class
 * so that they can be mocked out using the sinon library as is conventional
 * throughout the rest of the client library.
 */
class RowDataUtils {
    /**
     * Called by `filter` methods for fulfilling table and authorized view requests.
     *
     * @param {Filter} filter Filter to be applied to the contents of the row.
     * @param {RowProperties} properties Properties containing data for the request.
     * @param {object} configOrCallback Configuration object.
     * @param {function} cb The callback function.
     *
     */
    static filterUtil(filter, properties, configOrCallback, cb) {
        const config = typeof configOrCallback === 'object' ? configOrCallback : {};
        const callback = typeof configOrCallback === 'function' ? configOrCallback : cb;
        const reqOpts = Object.assign({
            appProfileId: properties.requestData.bigtable.appProfileId,
            rowKey: mutation_1.Mutation.convertToBytes(properties.requestData.id),
            predicateFilter: filter_1.Filter.parse(filter),
            trueMutations: createFlatMutationsList(config.onMatch),
            falseMutations: createFlatMutationsList(config.onNoMatch),
        }, properties.reqOpts);
        properties.requestData.data = {};
        // 1. Create a metrics collector.
        const metricsCollector = new operation_metrics_collector_1.OperationMetricsCollector(properties.requestData.table, client_side_metrics_attributes_1.MethodName.CHECK_AND_MUTATE_ROW, client_side_metrics_attributes_1.StreamingState.UNARY, properties.requestData.table.bigtable._metricsConfigManager.metricsHandlers);
        // 2. Tell the metrics collector an attempt has been started.
        metricsCollector.onOperationStart();
        // 3. Make a unary call with gax options that include interceptors. The
        // interceptors are built from a method that hooks them up to the
        // metrics collector
        properties.requestData.bigtable.request({
            client: 'BigtableClient',
            method: 'checkAndMutateRow',
            reqOpts,
            gaxOpts: (0, metric_interceptor_1.createMetricsUnaryInterceptorProvider)(config.gaxOptions ?? {}, metricsCollector),
        }, (err, apiResponse) => {
            metricsCollector.onOperationComplete(err ? err.code : 0);
            if (err) {
                callback(err, null, apiResponse);
                return;
            }
            callback(null, apiResponse.predicateMatched, apiResponse);
        });
        function createFlatMutationsList(entries) {
            const e2 = arrify(entries).map(entry => mutation_1.Mutation.parse(entry).mutations);
            return e2.reduce((a, b) => a.concat(b), []);
        }
    }
    static formatFamilies_Util(families, options) {
        const data = {};
        options = options || {};
        families.forEach(family => {
            const familyData = (data[family.name] = {});
            family.columns.forEach(column => {
                const qualifier = mutation_1.Mutation.convertFromBytes(column.qualifier);
                familyData[qualifier] = column.cells.map(cell => {
                    let value = cell.value;
                    if (options.decode !== false) {
                        value = mutation_1.Mutation.convertFromBytes(value, {
                            isPossibleNumber: true,
                        });
                    }
                    return {
                        value,
                        timestamp: cell.timestampMicros,
                        labels: cell.labels,
                    };
                });
            });
        });
        return data;
    }
    /**
     * Called by `createRules` methods for fulfilling table and authorized
     * view requests.
     *
     * @param {object|object[]} rules The rules to apply to this row.
     * @param {RowProperties} properties Properties containing data for the request.
     * @param {object} [gaxOptions] Request configuration options, outlined here:
     *     https://googleapis.github.io/gax-nodejs/CallSettings.html.
     * @param {function} callback The callback function.
     *
     */
    static createRulesUtil(rules, properties, optionsOrCallback, cb) {
        const gaxOptions = typeof optionsOrCallback === 'object' ? optionsOrCallback : {};
        const callback = typeof optionsOrCallback === 'function' ? optionsOrCallback : cb;
        if (!rules || rules.length === 0) {
            throw new Error('At least one rule must be provided.');
        }
        rules = arrify(rules).map(rule => {
            const column = mutation_1.Mutation.parseColumnName(rule.column);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const ruleData = {
                familyName: column.family,
                columnQualifier: mutation_1.Mutation.convertToBytes(column.qualifier),
            };
            if (rule.append) {
                ruleData.appendValue = mutation_1.Mutation.convertToBytes(rule.append);
            }
            if (rule.increment) {
                ruleData.incrementAmount = rule.increment;
            }
            return ruleData;
        });
        const reqOpts = Object.assign({
            appProfileId: properties.requestData.bigtable.appProfileId,
            rowKey: mutation_1.Mutation.convertToBytes(properties.requestData.id),
            rules,
        }, properties.reqOpts);
        properties.requestData.data = {};
        // 1. Create a metrics collector.
        const metricsCollector = new operation_metrics_collector_1.OperationMetricsCollector(properties.requestData.table, client_side_metrics_attributes_1.MethodName.READ_MODIFY_WRITE_ROW, client_side_metrics_attributes_1.StreamingState.UNARY, properties.requestData.table.bigtable._metricsConfigManager.metricsHandlers);
        // 2. Tell the metrics collector an attempt has been started.
        metricsCollector.onOperationStart();
        // 3. Make a unary call with gax options that include interceptors. The
        // interceptors are built from a method that hooks them up to the
        // metrics collector
        properties.requestData.bigtable.request({
            client: 'BigtableClient',
            method: 'readModifyWriteRow',
            reqOpts,
            gaxOpts: (0, metric_interceptor_1.createMetricsUnaryInterceptorProvider)(gaxOptions, metricsCollector),
        }, (err, ...args) => {
            metricsCollector.onOperationComplete(err ? err.code : 0);
            callback(err, ...args);
        });
    }
    /**
     * @param {string} column The column we are incrementing a value in.
     * @param {RowProperties} properties Properties containing data for the request.
     * @param {number} [valueOrOptionsOrCallback] The amount to increment by, defaults to 1.
     * @param {object} [optionsOrCallback] Request configuration options, outlined here:
     *     https://googleapis.github.io/gax-nodejs/CallSettings.html.
     * @param {function} cb The callback function.
     */
    static incrementUtils(column, properties, valueOrOptionsOrCallback, optionsOrCallback, cb) {
        const value = typeof valueOrOptionsOrCallback === 'number'
            ? valueOrOptionsOrCallback
            : 1;
        const gaxOptions = typeof valueOrOptionsOrCallback === 'object'
            ? valueOrOptionsOrCallback
            : typeof optionsOrCallback === 'object'
                ? optionsOrCallback
                : {};
        const callback = typeof valueOrOptionsOrCallback === 'function'
            ? valueOrOptionsOrCallback
            : typeof optionsOrCallback === 'function'
                ? optionsOrCallback
                : cb;
        const reqOpts = {
            column,
            increment: value,
        };
        this.createRulesUtil(reqOpts, properties, gaxOptions, (err, resp) => {
            if (err) {
                callback(err, null, resp);
                return;
            }
            const data = this.formatFamilies_Util(resp.row.families);
            const value = dotProp.get(data, column.replace(':', '.'))[0].value;
            callback(null, value, resp);
        });
    }
}
exports.RowDataUtils = RowDataUtils;
//# sourceMappingURL=row-data-utils.js.map