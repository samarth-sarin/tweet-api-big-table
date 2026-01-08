import { CallOptions, Operation, ServiceError } from 'google-gax';
import { google } from '../protos/protos';
import { Bigtable } from '.';
import { Instance } from './instance';
import { Backup, GetBackupsCallback, GetBackupsOptions, GetBackupsResponse, ModifiableBackupFields } from './backup';
import { Table } from './table';
export interface GenericCallback<T> {
    (err?: ServiceError | null, apiResponse?: T | null): void;
}
export interface GenericClusterCallback<T> {
    (err?: ServiceError | null, cluster?: Cluster | null, apiResponse?: T | null): void;
}
export interface GenericOperationCallback<T> {
    (err?: ServiceError | null, operation?: Operation | null, apiResponse?: T | null): void;
}
export type IEmpty = google.protobuf.IEmpty;
export type ICluster = google.bigtable.admin.v2.ICluster;
export type IOperation = google.longrunning.IOperation;
export type ApiResponse = [IOperation];
export type CreateClusterResponse = [ICluster, Operation, IOperation];
export type BooleanResponse = [boolean];
export type GetClusterResponse = [ICluster, IOperation];
export type GetClustersResponse = [Cluster[], IOperation];
export type GetClusterMetadataResponse = [ICluster, IOperation];
export type SetClusterMetadataResponse = [Operation, google.protobuf.Empty];
export type CreateClusterCallback = GenericCallback<IOperation>;
export type DeleteClusterCallback = GenericCallback<IOperation>;
export type ExistsClusterCallback = GenericCallback<boolean>;
export type GetClusterCallback = GenericClusterCallback<ICluster>;
export type GetClustersCallback = (err: ServiceError | null, clusters?: Cluster[], apiResponse?: google.bigtable.admin.v2.IListClustersResponse) => void;
export interface SetClusterMetadataOptions {
    nodes?: number;
    minServeNodes?: number;
    maxServeNodes?: number;
    cpuUtilizationPercent?: number;
    location?: string;
}
export type SetClusterMetadataCallback = GenericOperationCallback<Operation | null | undefined>;
export interface BasicClusterConfig {
    encryption?: google.bigtable.admin.v2.Cluster.IEncryptionConfig;
    key?: string;
    location: string;
    nodes?: number;
    storage?: string;
    minServeNodes?: number;
    maxServeNodes?: number;
    cpuUtilizationPercent?: number;
}
export interface CreateBackupConfig extends ModifiableBackupFields {
    table?: string | Table;
    gaxOptions?: CallOptions;
}
export type CreateBackupCallback = (err: ServiceError | Error | null, backup?: Backup, operation?: Operation, apiResponse?: IOperation) => void;
export type CreateBackupResponse = [Backup, Operation, IOperation];
export interface CreateClusterOptions extends BasicClusterConfig {
    gaxOptions?: CallOptions;
}
export type GetClusterMetadataCallback = (err: ServiceError | null, metadata?: ICluster | null, apiResponse?: IOperation | null) => void;
/**
 * Create a cluster object to interact with your cluster.
 *
 * @class
 * @param {Instance} instance The parent instance of this cluster.
 * @param {string} id Id of the cluster.
 *
 * @example
 * ```
 * const {Bigtable} = require('@google-cloud/bigtable');
 * const bigtable = new Bigtable();
 * const instance = bigtable.instance('my-instance');
 * const cluster = instance.cluster('my-cluster');
 * ```
 */
export declare class Cluster {
    bigtable: Bigtable;
    instance: Instance;
    id: string;
    name: string;
    metadata?: ICluster;
    constructor(instance: Instance, id: string);
    /**
     * Formats zone location.
     *
     * @private
     *
     * @param {string} project The project ID.
     * @param {string} location The zone location.
     * @returns {string}
     *
     * @example
     * ```
     * Cluster.getLocation_('my-project', 'us-central1-b');
     * // 'projects/my-project/locations/us-central1-b'
     * ```
     */
    static getLocation_(project: string, location: string): string;
    /**
     * Maps the storage type to the proper integer.
     *
     * @private
     *
     * @param {string} type The storage type (hdd, ssd).
     * @returns {number}
     *
     * @example
     * ```
     * Cluster.getStorageType_('ssd');
     * // 1
     * ```
     */
    static getStorageType_(type: string): number;
    /**
     * Get a reference to a Bigtable Cluster.
     *
     * @param {string} id The backup name or id.
     * @returns {Backup}
     */
    backup(id: string): Backup;
    create(): Promise<CreateClusterResponse>;
    create(options: CreateClusterOptions): Promise<CreateClusterResponse>;
    create(callback: CreateClusterCallback): void;
    create(options: CreateClusterOptions, callback: CreateClusterCallback): void;
    createBackup(id: string, config: CreateBackupConfig): Promise<CreateBackupResponse>;
    createBackup(id: string, config: CreateBackupConfig, callback: CreateBackupCallback): void;
    delete(): Promise<ApiResponse>;
    delete(gaxOptions: CallOptions): Promise<ApiResponse>;
    delete(callback: DeleteClusterCallback): void;
    delete(gaxOptions: CallOptions, callback: DeleteClusterCallback): void;
    exists(): Promise<BooleanResponse>;
    exists(gaxOptions: CallOptions): Promise<BooleanResponse>;
    exists(callback: ExistsClusterCallback): void;
    exists(gaxOptions: CallOptions, callback: ExistsClusterCallback): void;
    get(): Promise<GetClusterResponse>;
    get(gaxOptions: CallOptions): Promise<GetClusterResponse>;
    get(callback: GetClusterCallback): void;
    get(gaxOptions: CallOptions, callback: GetClusterCallback): void;
    getBackups(options?: GetBackupsOptions): Promise<GetBackupsResponse>;
    getBackups(options: GetBackupsOptions, callback: GetBackupsCallback): void;
    getBackups(callback: GetBackupsCallback): void;
    /**
     * Lists Cloud Bigtable backups within this cluster. Provides both
     * completed and pending backups as a readable object stream.
     *
     * @param {GetBackupsOptions} [options] Configuration object. See
     *     {@link Cluster#getBackups} for a complete list of options.
     * @returns {ReadableStream<Backup>}
     *
     * @example
     * ```
     * const {Bigtable} = require('@google-cloud/bigtable');
     * const bigtable = new Bigtable();
     * const instance = bigtable.instance('my-instance');
     * const cluster = instance.cluster('my-cluster');
     *
     * cluster.getBackupsStream()
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
     * cluster.getBackupsStream()
     *   .on('data', function(backup) {
     *     this.end();
     *   });
     * ```
     */
    getBackupsStream(options?: GetBackupsOptions): NodeJS.ReadableStream;
    getMetadata(): Promise<GetClusterMetadataResponse>;
    getMetadata(gaxOptions: CallOptions): Promise<GetClusterMetadataResponse>;
    getMetadata(callback: GetClusterMetadataCallback): void;
    getMetadata(gaxOptions: CallOptions, callback: GetClusterMetadataCallback): void;
    setMetadata(metadata: SetClusterMetadataOptions, gaxOptions?: CallOptions): Promise<SetClusterMetadataResponse>;
    setMetadata(metadata: SetClusterMetadataOptions, callback: SetClusterMetadataCallback): void;
    setMetadata(metadata: SetClusterMetadataOptions, gaxOptions: CallOptions, callback: SetClusterMetadataCallback): void;
}
/**
 * Reference to the {@link Cluster} class.
 * @name module:@google-cloud/bigtable.Cluster
 * @see Cluster
 */
