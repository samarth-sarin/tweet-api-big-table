import { RawFilter } from './filter';
import { CreateRulesCallback, FilterCallback, FilterConfig, FormatFamiliesOptions, IncrementCallback, Rule } from './row';
import { Family } from './chunktransformer';
import { google } from '../protos/protos';
import { TabularApiSurface } from './tabular-api-surface';
import { Bigtable } from './index';
import { CallOptions } from 'google-gax';
interface TabularApiSurfaceRequest {
    tableName?: string;
    authorizedViewName?: string;
}
export interface RowProperties {
    requestData: {
        data?: {
            [index: string]: Family;
        };
        id: string;
        table: TabularApiSurface;
        bigtable: Bigtable;
    };
    reqOpts: TabularApiSurfaceRequest;
}
/**
 * RowDataUtils is a class containing functionality needed by the Row and
 * AuthorizedView classes. Its static methods need to be contained in a class
 * so that they can be mocked out using the sinon library as is conventional
 * throughout the rest of the client library.
 */
declare class RowDataUtils {
    /**
     * Called by `filter` methods for fulfilling table and authorized view requests.
     *
     * @param {Filter} filter Filter to be applied to the contents of the row.
     * @param {RowProperties} properties Properties containing data for the request.
     * @param {object} configOrCallback Configuration object.
     * @param {function} cb The callback function.
     *
     */
    static filterUtil(filter: RawFilter, properties: RowProperties, configOrCallback?: FilterConfig | FilterCallback, cb?: FilterCallback): void;
    static formatFamilies_Util(families: google.bigtable.v2.IFamily[], options?: FormatFamiliesOptions): {
        [index: string]: {};
    };
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
    static createRulesUtil(rules: Rule | Rule[], properties: RowProperties, optionsOrCallback?: CallOptions | CreateRulesCallback, cb?: CreateRulesCallback): void;
    /**
     * @param {string} column The column we are incrementing a value in.
     * @param {RowProperties} properties Properties containing data for the request.
     * @param {number} [valueOrOptionsOrCallback] The amount to increment by, defaults to 1.
     * @param {object} [optionsOrCallback] Request configuration options, outlined here:
     *     https://googleapis.github.io/gax-nodejs/CallSettings.html.
     * @param {function} cb The callback function.
     */
    static incrementUtils(column: string, properties: RowProperties, valueOrOptionsOrCallback?: number | CallOptions | IncrementCallback, optionsOrCallback?: CallOptions | IncrementCallback, cb?: IncrementCallback): void;
}
export { RowDataUtils };
