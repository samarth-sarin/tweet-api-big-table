import { ServiceError } from 'google-gax';
import { Family, CreateFamilyOptions, CreateFamilyCallback, CreateFamilyResponse, IColumnFamily } from './family';
import { CallOptions } from 'google-gax';
import { Instance } from './instance';
import { ModifiableBackupFields } from './backup';
import { CreateBackupCallback, CreateBackupResponse } from './cluster';
import { google } from '../protos/protos';
import { TabularApiSurface, InsertRowsCallback, InsertRowsResponse, MutateCallback, MutateResponse, PartialFailureError, PrefixRange, GetRowsOptions, GetRowsCallback, GetRowsResponse } from './tabular-api-surface';
export { InsertRowsCallback, InsertRowsResponse, MutateCallback, MutateResponse, PartialFailureError, PrefixRange, GetRowsOptions, GetRowsCallback, GetRowsResponse, };
/**
 * @typedef {object} Policy
 * @property {number} [version] Specifies the format of the policy.
 *     Valid values are 0, 1, and 3. Requests specifying an invalid value will
 *     be rejected.
 *
 *     Operations affecting conditional bindings must specify version 3. This
 *     can be either setting a conditional policy, modifying a conditional
 *     binding, or removing a binding (conditional or unconditional) from the
 *     stored conditional policy.
 *     Operations on non-conditional policies may specify any valid value or
 *     leave the field unset.
 *
 *     If no etag is provided in the call to `setIamPolicy`, version compliance
 *     checks against the stored policy is skipped.
 * @property {array} [policy.bindings] Bindings associate members with roles.
 * @property {string} [policy.etag] `etag` is used for optimistic concurrency
 *     control as a way to help prevent simultaneous updates of a policy from
 *     overwriting each other. It is strongly suggested that systems make use
 *     of the `etag` in the read-modify-write cycle to perform policy updates
 *     in order to avoid raceconditions.
 */
export interface Policy {
    version?: number;
    bindings?: PolicyBinding[];
    etag?: Buffer | string;
}
/**
 * @typedef {object} PolicyBinding
 * @property {array} [PolicyBinding.role] Role that is assigned to `members`.
 *     For example, `roles/viewer`, `roles/editor`, or `roles/owner`.
 * @property {string} [PolicyBinding.members] Identities requesting access.
 *     The full list of accepted values is outlined here
 *     https://googleapis.dev/nodejs/bigtable/latest/google.iam.v1.html#.Binding
 * @property {Expr} [PolicyBinding.condition] The condition that is associated
 *     with this binding.
 *     NOTE: An unsatisfied condition will not allow user access via current
 *     binding. Different bindings, including their conditions, are examined
 *     independently.
 */
export interface PolicyBinding {
    role?: string;
    members?: string[];
    condition?: Expr | null;
}
/**
 * @typedef {object} Expr
 * @property {string} [Expr.expression] The application context of the containing
 *     message determines which well-known feature set of Common Expression Language
 *     is supported.
 * @property {string} [Expr.title] An optional title for the expression, i.e. a
 *     short string describing its purpose. This can be used e.g. in UIs which
 *     allow to enter the expression.
 * @property {string} [Expr.description] An optional description of the
 *     expression. This is a longer text which describes the expression,
 *     e.g. when hovered over it in a UI.
 * @property {string} [Expr.location] An optional string indicating the location
 *     of the expression for error reporting, e.g. a file name and a position
 *     in the file.
 */
interface Expr {
    expression?: string;
    title?: string;
    description?: string;
    location?: string;
}
/**
 * @callback GetIamPolicyCallback
 * @param {?Error} err Request error, if any.
 * @param {object} policy The policy.
 */
export interface GetIamPolicyCallback {
    (err?: Error | null, policy?: Policy): void;
}
/**
 * @typedef {array} GetIamPolicyResponse
 * @property {object} 0 The policy.
 */
export type GetIamPolicyResponse = [Policy];
export interface GetIamPolicyOptions {
    gaxOptions?: CallOptions;
    requestedPolicyVersion?: 0 | 1 | 3;
}
export type SetIamPolicyCallback = GetIamPolicyCallback;
export type SetIamPolicyResponse = GetIamPolicyResponse;
/**
 * @callback TestIamPermissionsCallback
 * @param {?Error} err Request error, if any.
 * @param {string[]} permissions A subset of permissions that the caller is
 *     allowed.
 */
export interface TestIamPermissionsCallback {
    (err?: Error | null, permissions?: string[]): void;
}
/**
 * @typedef {array} TestIamPermissionsResponse
 * @property {string[]} 0 A subset of permissions that the caller is allowed.
 */
export type TestIamPermissionsResponse = [string[]];
export interface CreateTableOptions {
    families?: {} | string[];
    gaxOptions?: CallOptions;
    splits?: string[];
}
export type CreateTableCallback = (err: ServiceError | null, table?: Table, apiResponse?: google.bigtable.admin.v2.Table) => void;
export type CreateTableResponse = [Table, google.bigtable.admin.v2.Table];
export type TableExistsCallback = (err: ServiceError | null, exists?: boolean) => void;
export type TableExistsResponse = [boolean];
export interface GetTablesOptions {
    gaxOptions?: CallOptions;
    /**
     * View over the table's fields. Possible options are 'name', 'schema' or
     * 'full'. Default: 'name'.
     */
    view?: 'name' | 'schema' | 'full';
    pageSize?: number;
    pageToken?: string;
}
export interface GetMetadataOptions {
    /**
     * Request configuration options, outlined here: https://googleapis.github.io/gax-nodejs/CallSettings.html.
     */
    gaxOptions?: CallOptions;
    /**
     * The view to be applied to the table fields.
     */
    view?: string;
}
export interface GetTableOptions {
    /**
     * Automatically create the instance if it does not already exist.
     */
    autoCreate?: boolean;
    /**
     * Request configuration options, outlined here: https://googleapis.github.io/gax-nodejs/CallSettings.html.
     */
    gaxOptions?: CallOptions;
}
export interface MutateOptions {
    /**
     * Request configuration options, outlined here: https://googleapis.github.io/gax-nodejs/global.html#CallOptions.
     */
    gaxOptions?: CallOptions;
    /**
     * If set to `true` will treat entriesmas a raw Mutation object. See {@link Mutation#parse}.
     */
    rawMutation?: boolean;
}
export type Entry = any;
export type DeleteTableCallback = (err: ServiceError | null, apiResponse?: google.protobuf.Empty) => void;
export type DeleteTableResponse = [google.protobuf.Empty];
export type CheckConsistencyCallback = (err: ServiceError | null, consistent?: boolean) => void;
export type CheckConsistencyResponse = [boolean];
export type GenerateConsistencyTokenCallback = (err: ServiceError | null, token?: string) => void;
export type GenerateConsistencyTokenResponse = [string];
export type WaitForReplicationCallback = (err: ServiceError | null, wait?: boolean) => void;
export type WaitForReplicationResponse = [boolean];
export type TruncateCallback = (err: ServiceError | null, apiResponse?: google.protobuf.Empty) => void;
export type TruncateResponse = [google.protobuf.Empty];
export type SampleRowKeysCallback = (err: ServiceError | null, keys?: string[]) => void;
export type SampleRowsKeysResponse = [{
    key: Uint8Array;
    offset: string;
}[]];
export type DeleteRowsCallback = (err: ServiceError | null, apiResponse?: google.protobuf.Empty) => void;
export type DeleteRowsResponse = [google.protobuf.Empty];
export type GetMetadataCallback = (err: ServiceError | null, apiResponse: google.bigtable.admin.v2.ITable) => void;
export type GetMetadataResponse = [google.bigtable.admin.v2.Table];
export type GetTableCallback = (err: ServiceError | null, table?: Table, apiResponse?: google.bigtable.admin.v2.ITable) => void;
export type GetTableResponse = [Table, google.bigtable.admin.v2.Table];
export type GetTablesCallback = (err: ServiceError | null, tables?: Table[], apiResponse?: google.bigtable.admin.v2.ITable[]) => void;
export type GetTablesResponse = [Table[], google.bigtable.admin.v2.Table[]];
export type GetFamiliesCallback = (err: ServiceError | null, families?: Family[], apiResponse?: IColumnFamily) => void;
export type GetFamiliesResponse = [Family[], IColumnFamily];
export type GetReplicationStatesCallback = (err: ServiceError | null, clusterStates?: Map<string, google.bigtable.admin.v2.Table.IClusterState>, apiResponse?: {}) => void;
export type GetReplicationStatesResponse = [
    Map<string, google.bigtable.admin.v2.Table.IClusterState>,
    google.bigtable.admin.v2.ITable
];
export interface CreateBackupConfig extends ModifiableBackupFields {
    gaxOptions?: CallOptions;
}
/**
 * Create a Table object to interact with a Cloud Bigtable table.
 *
 * @class
 * @param {Instance} instance Instance Object.
 * @param {string} id Unique identifier of the table.
 *
 * @example
 * ```
 * const {Bigtable} = require('@google-cloud/bigtable');
 * const bigtable = new Bigtable();
 * const instance = bigtable.instance('my-instance');
 * const table = instance.table('prezzy');
 * ```
 */
export declare class Table extends TabularApiSurface {
    constructor(instance: Instance, id: string);
    /**
     * Formats the decodes policy etag value to string.
     *
     * @private
     *
     * @param {object} policy
     */
    static decodePolicyEtag(policy: Policy): Policy;
    /**
     * Formats the table name to include the Bigtable cluster.
     *
     * @private
     *
     * @param {string} instanceName The formatted instance name.
     * @param {string} name The table name.
     *
     * @example
     * ```
     * Table.formatName_(
     *   'projects/my-project/zones/my-zone/instances/my-instance',
     *   'my-table'
     * );
     * //
     * 'projects/my-project/zones/my-zone/instances/my-instance/tables/my-table'
     * ```
     */
    static formatName_(instanceName: string, id: string): string;
    /**
     * Creates a range based off of a key prefix.
     *
     * @private
     *
     * @param {string} start The key prefix/starting bound.
     * @returns {object} range
     *
     * @example
     * ```
     * const {Bigtable} = require('@google-cloud/bigtable');
     * const bigtable = new Bigtable();
     * const instance = bigtable.instance('my-instance');
     * const table = instance.table('prezzy');
     * table.createPrefixRange('start');
     * // => {
     * //   start: 'start',
     * //   end: {
     * //     value: 'staru',
     * //     inclusive: false
     * //   }
     * // }
     * ```
     */
    static createPrefixRange(start: string): PrefixRange;
    create(options?: CreateTableOptions): Promise<CreateTableResponse>;
    create(options: CreateTableOptions, callback: CreateTableCallback): void;
    create(callback: CreateTableCallback): void;
    createBackup(id: string, config: CreateBackupConfig): Promise<CreateBackupResponse>;
    createBackup(id: string, config: CreateBackupConfig, callback: CreateBackupCallback): void;
    createBackup(id: string, config: CreateBackupConfig, callback: CreateBackupCallback): void;
    createFamily(id: string, options?: CreateFamilyOptions): Promise<CreateFamilyResponse>;
    createFamily(id: string, options: CreateFamilyOptions, callback: CreateFamilyCallback): void;
    createFamily(id: string, callback: CreateFamilyCallback): void;
    delete(gaxOptions?: CallOptions): Promise<DeleteTableResponse>;
    delete(gaxOptions: CallOptions, callback: DeleteTableCallback): void;
    delete(callback: DeleteTableCallback): void;
    deleteRows(prefix: string, gaxOptions?: CallOptions): Promise<DeleteRowsResponse>;
    deleteRows(prefix: string, gaxOptions: CallOptions, callback: DeleteRowsCallback): void;
    deleteRows(prefix: string, callback: DeleteRowsCallback): void;
    exists(gaxOptions?: CallOptions): Promise<TableExistsResponse>;
    exists(gaxOptions: CallOptions, callback: TableExistsCallback): void;
    exists(callback: TableExistsCallback): void;
    /**
     * Get a reference to a Table Family.
     *
     * @throws {error} If a name is not provided.
     *
     * @param {string} id The family unique identifier.
     * @returns {Family}
     *
     * @example
     * ```
     * const family = table.family('my-family');
     * ```
     */
    family(id: string): Family;
    get(options?: GetTableOptions): Promise<GetTableResponse>;
    get(options: GetTableOptions, callback: GetTableCallback): void;
    get(callback: GetTableCallback): void;
    getIamPolicy(options?: GetIamPolicyOptions): Promise<[Policy]>;
    getIamPolicy(options: GetIamPolicyOptions, callback: GetIamPolicyCallback): void;
    getFamilies(gaxOptions?: CallOptions): Promise<GetFamiliesResponse>;
    getFamilies(gaxOptions: CallOptions, callback: GetFamiliesCallback): void;
    getFamilies(callback: GetFamiliesCallback): void;
    getReplicationStates(gaxOptions?: CallOptions): Promise<GetReplicationStatesResponse>;
    getReplicationStates(gaxOptions: CallOptions, callback: GetReplicationStatesCallback): void;
    getReplicationStates(callback: GetReplicationStatesCallback): void;
    getMetadata(options?: GetMetadataOptions): Promise<GetMetadataResponse>;
    getMetadata(options: GetMetadataOptions, callback: GetMetadataCallback): void;
    getMetadata(callback: GetMetadataCallback): void;
    setIamPolicy(policy: Policy, gaxOptions?: CallOptions): Promise<SetIamPolicyResponse>;
    setIamPolicy(policy: Policy, callback: SetIamPolicyCallback): void;
    setIamPolicy(policy: Policy, gaxOptions: CallOptions, callback: SetIamPolicyCallback): void;
    testIamPermissions(permissions: string | string[], gaxOptions?: CallOptions): Promise<TestIamPermissionsResponse>;
    testIamPermissions(permissions: string | string[], callback: TestIamPermissionsCallback): void;
    testIamPermissions(permissions: string | string[], gaxOptions: CallOptions, callback: TestIamPermissionsCallback): void;
    truncate(gaxOptions?: CallOptions): Promise<TruncateResponse>;
    truncate(gaxOptions: CallOptions, callback: TruncateCallback): void;
    truncate(callback: TruncateCallback): void;
    waitForReplication(): Promise<WaitForReplicationResponse>;
    waitForReplication(callback: WaitForReplicationCallback): void;
    generateConsistencyToken(): Promise<GenerateConsistencyTokenResponse>;
    generateConsistencyToken(callback: GenerateConsistencyTokenCallback): void;
    checkConsistency(token: string): Promise<CheckConsistencyResponse>;
    checkConsistency(token: string, callback: CheckConsistencyCallback): void;
    /**
     * The view to be applied to the returned table's fields.
     * Defaults to schema if unspecified.
     *
     * @private
     */
    static VIEWS: {
        [index: string]: number;
    };
}
export interface GoogleInnerError {
    reason?: string;
    message?: string;
}
