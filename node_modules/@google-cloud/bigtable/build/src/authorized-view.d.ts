import { TabularApiSurface } from './tabular-api-surface';
import { CallOptions } from 'google-gax';
import { CreateRulesCallback, CreateRulesResponse, FilterCallback, FilterConfig, FilterResponse, IncrementCallback, IncrementResponse, Rule } from './row';
import { RawFilter } from './filter';
import { Instance } from './instance';
interface FilterInformation {
    filter: RawFilter;
    rowId: string;
}
interface CreateRulesInformation {
    rules: Rule | Rule[];
    rowId: string;
}
interface IncrementInformation {
    column: string;
    rowId: string;
}
/**
 * The AuthorizedView class is a class that is available to the user that
 * contains methods the user can call to work with authorized views.
 *
 * @class
 * @param {Table} table The table that the authorized view exists on.
 * @param {string} id Unique identifier of the authorized view.
 *
 */
export declare class AuthorizedView extends TabularApiSurface {
    private readonly rowData;
    constructor(instance: Instance, tableName: string, viewName: string);
    createRules(createRulesInfo: CreateRulesInformation, options?: CallOptions): Promise<CreateRulesResponse>;
    createRules(createRulesInfo: CreateRulesInformation, options: CallOptions, callback: CreateRulesCallback): void;
    createRules(createRulesInfo: CreateRulesInformation, callback: CreateRulesCallback): void;
    /**
     * Mutates a row atomically based on the output of a filter. Depending on
     * whether or not any results are yielded, either the `onMatch` or `onNoMatch`
     * callback will be executed.
     *
     * @param {FilterInformation} filter Filter to be applied to the contents of
     * the row along with the row id of the affected row.
     * @param {object} config Configuration object.
     * @param {?object[]} config.onMatch A list of entries to be ran if a match is
     *     found.
     * @param {object[]} [config.onNoMatch] A list of entries to be ran if no
     *     matches are found.
     * @param {object} [config.gaxOptions] Request configuration options, outlined
     *     here: https://googleapis.github.io/gax-nodejs/global.html#CallOptions.
     * @param {function} callback The callback function.
     * @param {?error} callback.err An error returned while making this
     *     request.
     * @param {boolean} callback.matched Whether a match was found or not.
     *
     * @example <caption>include:samples/api-reference-doc-snippets/row.js</caption>
     * region_tag:bigtable_api_row_filter
     */
    filter(filterInfo: FilterInformation, config?: FilterConfig): Promise<FilterResponse>;
    filter(filterInfo: FilterInformation, config: FilterConfig, callback: FilterCallback): void;
    filter(filterInfo: FilterInformation, callback: FilterCallback): void;
    /**
     * Generates request properties necessary for making an rpc call for an
     * authorized view.
     *
     * @param {string} id The row id to generate the properties for.
     * @private
     */
    private generateProperties;
    increment(columnInfo: IncrementInformation, value?: number): Promise<IncrementResponse>;
    increment(columnInfo: IncrementInformation, value: number, options?: CallOptions): Promise<IncrementResponse>;
    increment(columnInfo: IncrementInformation, options?: CallOptions): Promise<IncrementResponse>;
    increment(columnInfo: IncrementInformation, value: number, options: CallOptions, callback: IncrementCallback): void;
    increment(columnInfo: IncrementInformation, value: number, callback: IncrementCallback): void;
    increment(columnInfo: IncrementInformation, options: CallOptions, callback: IncrementCallback): void;
    increment(columnInfo: IncrementInformation, callback: IncrementCallback): void;
    /**
     * Sets the row data for a particular row to an empty object
     *
     * @param {string} id An string with the key of the row to initialize.
     * @private
     */
    private initializeRow;
}
export {};
