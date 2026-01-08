import { AppProfile, AppProfileOptions, CreateAppProfileCallback, CreateAppProfileResponse, GetAppProfilesCallback, GetAppProfilesResponse } from './app-profile';
import { GetBackupsCallback, GetBackupsOptions, GetBackupsResponse } from './backup';
import { Cluster, CreateClusterOptions, CreateClusterCallback, CreateClusterResponse, GetClustersCallback, GetClustersResponse, IOperation, BasicClusterConfig } from './cluster';
import { GetIamPolicyCallback, GetIamPolicyOptions, Policy, SetIamPolicyCallback, SetIamPolicyResponse, Table, TestIamPermissionsCallback, TestIamPermissionsResponse, CreateTableOptions, CreateTableCallback, CreateTableResponse, GetTablesOptions, GetTablesCallback, GetTablesResponse } from './table';
import { CallOptions, Operation } from 'google-gax';
import { ServiceError } from 'google-gax';
import { Bigtable } from '.';
import { google } from '../protos/protos';
import { Backup, RestoreTableCallback, RestoreTableResponse } from './backup';
import { AuthorizedView } from './authorized-view';
import * as SqlTypes from './execute-query/types';
import { ExecuteQueryParameterValue, QueryResultRow } from './execute-query/values';
import { ExecuteQueryStreamWithMetadata } from './execute-query/values';
import { PreparedStatement } from './execute-query/preparedstatement';
export interface ClusterInfo extends BasicClusterConfig {
    id: string;
}
export interface InstanceOptions {
    /**
     * The clusters to be created within the instance.
     */
    clusters: ClusterInfo[] | ClusterInfo;
    /**
     * The descriptive name for this instance as it appears in UIs.
     */
    displayName?: string;
    /**
     * Labels are a flexible and lightweight mechanism for organizing cloud
     * resources into groups that reflect a customer's organizational needs and
     * deployment strategies. They can be used to filter resources and
     * aggregate metrics.
     *
     * Label keys must be between 1 and 63 characters long and must conform to
     * the regular expression: `[\p{Ll}\p{Lo}][\p{Ll}\p{Lo}\p{N}_-]{0,62}`.
     * Label values must be between 0 and 63 characters long and must conform
     * to the regular expression: `[\p{Ll}\p{Lo}\p{N}_-]{0,63}`.
     * No more than 64 labels can be associated with a given resource.
     * Keys and values must both be under 128 bytes.
     */
    labels?: {
        [index: string]: any;
    };
    type?: 'production' | 'development';
    /**
     * Request configuration options, outlined here:
     * https://googleapis.github.io/gax-nodejs/CallSettings.html.
     */
    gaxOptions?: CallOptions;
}
export type IInstance = google.bigtable.admin.v2.IInstance;
export interface LongRunningResourceCallback<Resource> {
    (err: ServiceError | null, resource?: Resource, operation?: Operation, apiResponse?: IOperation): void;
}
export type CreateInstanceCallback = LongRunningResourceCallback<Instance>;
export type CreateInstanceResponse = [Instance, Operation, IOperation];
export type DeleteInstanceCallback = (err: ServiceError | null, apiResponse?: google.protobuf.Empty) => void;
export type DeleteInstanceResponse = [google.protobuf.Empty];
export type InstanceExistsCallback = (err: ServiceError | null, exists?: boolean) => void;
export type InstanceExistsResponse = [boolean];
export type GetInstanceCallback = (err: ServiceError | null, instance?: Instance, apiResponse?: IInstance) => void;
export type GetInstanceResponse = [Instance, IInstance];
export type GetInstanceMetadataCallback = (err: ServiceError | null, metadata?: IInstance) => void;
export type GetInstanceMetadataResponse = [IInstance];
export type SetInstanceMetadataCallback = (err: ServiceError | null, apiResponse?: google.protobuf.Empty) => void;
export type SetInstanceMetadataResponse = [google.protobuf.Empty];
export interface CreateTableFromBackupConfig {
    table: string;
    backup: Backup | string;
    gaxOptions?: CallOptions;
}
export type ExecuteQueryCallback = (err: Error | null, rows?: QueryResultRow[]) => void;
export interface ExecuteQueryOptions {
    preparedStatement: PreparedStatement;
    parameters?: {
        [param: string]: ExecuteQueryParameterValue;
    };
    retryOptions?: CallOptions;
    encoding?: BufferEncoding;
}
export type ExecuteQueryResponse = [QueryResultRow[]];
export type PrepareStatementCallback = (err: Error | null, preparedStatement?: PreparedStatement) => void;
export interface PrepareStatementOptions {
    query: string;
    parameterTypes?: {
        [param: string]: SqlTypes.Type;
    };
    retryOptions?: CallOptions;
    encoding?: BufferEncoding;
}
export type PrepareStatementResponse = [PreparedStatement];
/**
 * Create an Instance object to interact with a Cloud Bigtable instance.
 *
 * @class
 * @param {Bigtable} bigtable The parent {@link Bigtable} object of this
 *     instance.
 * @param {string} id Id of the instance.
 *
 * @example
 * ```
 * const {Bigtable} = require('@google-cloud/bigtable');
 * const bigtable = new Bigtable();
 * const instance = bigtable.instance('my-instance');
 * ```
 */
export declare class Instance {
    bigtable: Bigtable;
    id: string;
    name: string;
    metadata?: google.bigtable.admin.v2.IInstance;
    constructor(bigtable: Bigtable, id: string);
    /**
     * Maps the instance type to the proper integer.
     *
     * @private
     *
     * @param {string} type The instance type (production, development).
     * @returns {number}
     *
     * @example
     * ```
     * Instance.getTypeType_('production');
     * // 1
     * ```
     */
    static getTypeType_(type?: string): number;
    /**
     * Get a reference to a Bigtable App Profile.
     *
     * @param {string} name The name of the app profile.
     * @returns {AppProfile}
     */
    appProfile(name: string): AppProfile;
    create(options: InstanceOptions): Promise<CreateInstanceResponse>;
    create(options: InstanceOptions, callback: CreateInstanceCallback): void;
    createAppProfile(id: string, options?: AppProfileOptions): Promise<CreateAppProfileResponse>;
    createAppProfile(id: string, options: AppProfileOptions, callback: CreateAppProfileCallback): void;
    createAppProfile(id: string, callback: CreateAppProfileCallback): void;
    createCluster(id: string, options?: CreateClusterOptions): Promise<CreateClusterResponse>;
    createCluster(id: string, options: CreateClusterOptions, callback: CreateClusterCallback): void;
    createCluster(id: string, callback: CreateClusterCallback): void;
    createTable(id: string, options?: CreateTableOptions): Promise<CreateTableResponse>;
    createTable(id: string, options: CreateTableOptions, callback: CreateTableCallback): void;
    createTable(id: string, callback: CreateTableCallback): void;
    /**
     * Get a reference to a Bigtable Cluster.
     *
     * @param {string} id The id of the cluster.
     * @returns {Cluster}
     */
    cluster(id: string): Cluster;
    delete(gaxOptions?: CallOptions): Promise<DeleteInstanceResponse>;
    delete(gaxOptions: CallOptions, callback: DeleteInstanceCallback): void;
    delete(callback: DeleteInstanceCallback): void;
    exists(options?: CallOptions): Promise<InstanceExistsResponse>;
    exists(options: CallOptions, callback: InstanceExistsCallback): void;
    exists(callback: InstanceExistsCallback): void;
    get(gaxOptions?: CallOptions): Promise<GetInstanceResponse>;
    get(gaxOptions: CallOptions, callback: GetInstanceCallback): void;
    get(callback: GetInstanceCallback): void;
    getAppProfiles(options?: CallOptions): Promise<GetAppProfilesResponse>;
    getAppProfiles(options: CallOptions, callback: GetAppProfilesCallback): void;
    getAppProfiles(callback: GetAppProfilesCallback): void;
    /**
     * Get {@link AppProfile} objects for all the App Profiles in your
     * Cloud Bigtable instance as a readable object stream.
     *
     * @param {object} [gaxOptions] Request configuration options, outlined here:
     *     https://googleapis.github.io/gax-nodejs/CallSettings.html.
     *     {@link Instance#getAppProfiles} for a complete list of options.
     * @returns {stream}
     *
     * @example
     * ```
     * const {Bigtable} = require('@google-cloud/bigtable');
     * const bigtable = new Bigtable();
     * const instance = bigtable.instance('my-instance');
     *
     * instance.getAppProfilesStream()
     *   .on('error', console.error)
     *   .on('data', function(appProfile) {
     *     // appProfile is a AppProfile object.
     *   })
     *   .on('end', () => {
     *     // All appProfiles retrieved.
     *   });
     *
     * //-
     * // If you anticipate many results, you can end a stream early to prevent
     * // unnecessary processing and API requests.
     * //-
     * instance.getAppProfilesStream()
     *   .on('data', function(appProfile) {
     *     this.end();
     *   });
     * ```
     */
    getAppProfilesStream(gaxOptions?: CallOptions): NodeJS.ReadableStream;
    getBackups(options?: GetBackupsOptions): Promise<GetBackupsResponse>;
    getBackups(options: GetBackupsOptions, callback: GetBackupsCallback): void;
    getBackups(callback: GetBackupsCallback): void;
    /**
     * Get Cloud Bigtable Backup instances within this instance. This returns both
     * completed and pending backups as a readable stream.
     *
     * @param {GetBackupsOptions} [options] Configuration object. See
     *     {@link Instance#getBackups} for a complete list of options.
     * @returns {ReadableStream<Backup>}
     *
     * @example
     * ```
     * const {Bigtable} = require('@google-cloud/bigtable');
     * const bigtable = new Bigtable();
     * const instance = bigtable.instance('my-instance');
     *
     * instance.getBackupsStream()
     *   .on('error', console.error)
     *   .on('data', function(backup) {
     *     // backup is a Backup object.
     *   })
     *   .on('end', () => {
     *     // All backups retrieved.
     *   });
     *
     * //-
     * // If you anticipate many results, you can end a stream early to prevent
     * // unnecessary processing and API requests.
     * //-
     * instance.getBackupsStream()
     *   .on('data', function(backup) {
     *     this.end();
     *   });
     * ```
     */
    getBackupsStream(options?: GetBackupsOptions): NodeJS.ReadableStream;
    getClusters(options?: CallOptions): Promise<GetClustersResponse>;
    getClusters(options: CallOptions, callback: GetClustersCallback): void;
    getClusters(callback: GetClustersCallback): void;
    getIamPolicy(options?: GetIamPolicyOptions): Promise<[Policy]>;
    getIamPolicy(options: GetIamPolicyOptions, callback: GetIamPolicyCallback): void;
    getMetadata(options?: CallOptions): Promise<GetInstanceMetadataResponse>;
    getMetadata(options: CallOptions, callback: GetInstanceMetadataCallback): void;
    getMetadata(callback: GetInstanceMetadataCallback): void;
    getTables(options?: GetTablesOptions): Promise<GetTablesResponse>;
    getTables(options: GetTablesOptions, callback: GetTablesCallback): void;
    getTables(callback: GetTablesCallback): void;
    /**
     * Get {@link Table} objects for all the tables in your Cloud Bigtable
     * instance as a readable object stream.
     *
     * @param {object} [options] Query object. See
     *     {@link Instance#getTables} for a complete list of options.
     * @returns {stream}
     *
     * @example
     * ```
     * const {Bigtable} = require('@google-cloud/bigtable');
     * const bigtable = new Bigtable();
     * const instance = bigtable.instance('my-instance');
     *
     * instance.getTablesStream()
     *   .on('error', console.error)
     *   .on('data', function(table) {
     *     // table is a Table object.
     *   })
     *   .on('end', () => {
     *     // All tables retrieved.
     *   });
     *
     * //-
     * // If you anticipate many results, you can end a stream early to prevent
     * // unnecessary processing and API requests.
     * //-
     * instance.getTablesStream()
     *   .on('data', function(table) {
     *     this.end();
     *   });
     * ```
     */
    getTablesStream(options?: GetTablesOptions): NodeJS.ReadableStream;
    createTableFromBackup(config: CreateTableFromBackupConfig): Promise<RestoreTableResponse>;
    createTableFromBackup(config: CreateTableFromBackupConfig, callback: RestoreTableCallback): void;
    setIamPolicy(policy: Policy, gaxOptions?: CallOptions): Promise<SetIamPolicyResponse>;
    setIamPolicy(policy: Policy, gaxOptions: CallOptions, callback: SetIamPolicyCallback): void;
    setIamPolicy(policy: Policy, callback: SetIamPolicyCallback): void;
    setMetadata(metadata: IInstance, options?: CallOptions): Promise<SetInstanceMetadataResponse>;
    setMetadata(metadata: IInstance, options: CallOptions, callback: SetInstanceMetadataCallback): void;
    setMetadata(metadata: IInstance, callback: SetInstanceMetadataCallback): void;
    /**
     * Get a reference to a Bigtable table.
     *
     * @param {string} id Unique identifier of the table.
     * @returns {Table}
     *
     * @example
     * ```
     * const {Bigtable} = require('@google-cloud/bigtable');
     * const bigtable = new Bigtable();
     * const instance = bigtable.instance('my-instance');
     * const table = instance.table('presidents');
     * ```
     */
    table(id: string): Table;
    testIamPermissions(permissions: string | string[], gaxOptions?: CallOptions): Promise<TestIamPermissionsResponse>;
    testIamPermissions(permissions: string | string[], callback: TestIamPermissionsCallback): void;
    testIamPermissions(permissions: string | string[], gaxOptions: CallOptions, callback: TestIamPermissionsCallback): void;
    /**
     * Gets an Authorized View object for making authorized view grpc calls.
     *
     * @param {string} tableName The name for the Table
     * @param {string} viewName The name for the Authorized view
     */
    view(tableName: string, viewName: string): AuthorizedView;
    prepareStatement(options: PrepareStatementOptions): Promise<PrepareStatementResponse>;
    prepareStatement(options: PrepareStatementOptions, callback: PrepareStatementCallback): void;
    prepareStatement(query: string): Promise<PrepareStatementResponse>;
    prepareStatement(query: string, callback: PrepareStatementCallback): void;
    executeQuery(options: ExecuteQueryOptions): Promise<ExecuteQueryResponse>;
    executeQuery(options: ExecuteQueryOptions, callback: ExecuteQueryCallback): void;
    executeQuery(preparedStatement: PreparedStatement): Promise<ExecuteQueryResponse>;
    executeQuery(preparedStatement: PreparedStatement, callback: ExecuteQueryCallback): void;
    /**
     * Execute a SQL query on an instance.
     *
     * @param {PreparedStatement} [preparedStatement] SQL query to execute. Parameters can be specified using @name notation.
     * @param {object} [opts] Configuration object.
     * @param {object} [opts.parameters] Object mapping names of parameters used in the query to JS values.
     * @param {object} [opts.retryOptions] Retry options used for executing the query. Note that the only values
     *   used are:
     *   - retryOptions.retry.retryCodes
     *   - retryOptions.retry.backoffSettings.maxRetries
     *   - retryOptions.retry.backoffSettings.totalTimeoutMillis
     *   - retryOptions.retry.backoffSettings.maxRetryDelayMillis
     *   - retryOptions.retry.backoffSettings.retryDelayMultiplier
     *   - retryOptions.retry.backoffSettings.initialRetryDelayMillis
     * @returns {ExecuteQueryStreamWithMetadata}
     *
     * @example <caption>include:samples/api-reference-doc-snippets/instance.js</caption>
     * region_tag:bigtable_api_create_query_stream
     */
    createExecuteQueryStream(opts: ExecuteQueryOptions): ExecuteQueryStreamWithMetadata;
}
/**
 * Reference to the {@link Instance} class.
 * @name module:@google-cloud/bigtable.Instance
 * @see Instance
 */
