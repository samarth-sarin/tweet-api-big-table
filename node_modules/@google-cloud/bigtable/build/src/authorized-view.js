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
exports.AuthorizedView = void 0;
const tabular_api_surface_1 = require("./tabular-api-surface");
const row_data_utils_1 = require("./row-data-utils");
const promisify_1 = require("@google-cloud/promisify");
/**
 * The AuthorizedView class is a class that is available to the user that
 * contains methods the user can call to work with authorized views.
 *
 * @class
 * @param {Table} table The table that the authorized view exists on.
 * @param {string} id Unique identifier of the authorized view.
 *
 */
class AuthorizedView extends tabular_api_surface_1.TabularApiSurface {
    rowData;
    constructor(instance, tableName, viewName) {
        super(instance, tableName, viewName);
        this.rowData = {};
    }
    /**
     * Update a row with rules specifying how the row's contents are to be
     * transformed into writes. Rules are applied in order, meaning that earlier
     * rules will affect the results of later ones.
     *
     * @throws {error} If no rules are provided.
     *
     * @param {CreateRulesInformation} createRulesInfo The rules to apply to a row
     *    along with the row id of the row to update.
     * @param {object} [gaxOptions] Request configuration options, outlined here:
     *     https://googleapis.github.io/gax-nodejs/CallSettings.html.
     * @param {function} callback The callback function.
     * @param {?error} callback.err An error returned while making this
     *     request.
     * @param {object} callback.apiResponse The full API response.
     *
     * @example <caption>include:samples/api-reference-doc-snippets/row.js</caption>
     * region_tag:bigtable_api_create_rules
     */
    createRules(createRulesInfo, optionsOrCallback, cb) {
        this.initializeRow(createRulesInfo.rowId);
        row_data_utils_1.RowDataUtils.createRulesUtil(createRulesInfo.rules, this.generateProperties(createRulesInfo.rowId), optionsOrCallback, cb);
    }
    filter(filterInfo, configOrCallback, cb) {
        this.initializeRow(filterInfo.rowId);
        row_data_utils_1.RowDataUtils.filterUtil(filterInfo.filter, this.generateProperties(filterInfo.rowId), configOrCallback, cb);
    }
    /**
     * Generates request properties necessary for making an rpc call for an
     * authorized view.
     *
     * @param {string} id The row id to generate the properties for.
     * @private
     */
    generateProperties(id) {
        return {
            requestData: {
                data: this.rowData[id],
                id,
                table: this,
                bigtable: this.bigtable,
            },
            reqOpts: {
                authorizedViewName: this.name + '/authorizedViews/' + this.viewName,
            },
        };
    }
    /**
     * Increment a specific column within the row. If the column does not
     * exist, it is automatically initialized to 0 before being incremented.
     *
     * @param {IncrementInformation} columnInfo The column we are incrementing a
     * value in along with the row id of the affected row.
     * @param {number} [value] The amount to increment by, defaults to 1.
     * @param {object} [gaxOptions] Request configuration options, outlined here:
     *     https://googleapis.github.io/gax-nodejs/CallSettings.html.
     * @param {function} callback The callback function.
     * @param {?error} callback.err An error returned while making this
     *     request.
     * @param {number} callback.value The updated value of the column.
     * @param {object} callback.apiResponse The full API response.
     *
     * @example <caption>include:samples/api-reference-doc-snippets/row.js</caption>
     * region_tag:bigtable_api_row_increment
     */
    increment(columnInfo, valueOrOptionsOrCallback, optionsOrCallback, cb) {
        this.initializeRow(columnInfo.rowId);
        row_data_utils_1.RowDataUtils.incrementUtils(columnInfo.column, this.generateProperties(columnInfo.rowId), valueOrOptionsOrCallback, optionsOrCallback, cb);
    }
    /**
     * Sets the row data for a particular row to an empty object
     *
     * @param {string} id An string with the key of the row to initialize.
     * @private
     */
    initializeRow(id) {
        if (!this.rowData[id]) {
            this.rowData[id] = {};
        }
    }
}
exports.AuthorizedView = AuthorizedView;
(0, promisify_1.promisifyAll)(AuthorizedView, {
    exclude: ['initializeRow', 'generateProperties'],
});
//# sourceMappingURL=authorized-view.js.map