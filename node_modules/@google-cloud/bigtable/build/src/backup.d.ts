import { PreciseDate } from '@google-cloud/precise-date';
import { google } from '../protos/protos';
import { Bigtable, Cluster, GetIamPolicyCallback, GetIamPolicyOptions, GetIamPolicyResponse, Policy, SetIamPolicyCallback, SetIamPolicyResponse, TestIamPermissionsCallback, TestIamPermissionsResponse } from './';
import { Table } from '../src/table';
import { CreateBackupConfig, CreateBackupCallback, CreateBackupResponse, IOperation } from './cluster';
import { CallOptions, Operation, ServiceError } from 'google-gax';
import { Instance } from './instance';
export type CopyBackupResponse = GenericBackupPromise<Operation>;
export type CopyBackupCallback = GenericBackupCallback<Operation>;
export interface CopyBackupConfig extends ModifiableBackupFields {
    cluster: Cluster;
    gaxOptions?: CallOptions;
    id: string;
}
type IEmpty = google.protobuf.IEmpty;
export type IBackup = google.bigtable.admin.v2.IBackup;
export type BackupTimestamp = google.protobuf.ITimestamp | PreciseDate | Date;
export interface ModifiableBackupFields {
    /**
     * The ITimestamp (Date or PreciseDate will be converted) representing
     * when the backup will automatically be deleted. This must be at a
     * minimum 6 hours from the time of the backup request and a maximum of 30
     * days.
     */
    expireTime?: BackupTimestamp;
}
export interface GenericBackupCallback<T> {
    (err?: ServiceError | null, backup?: Backup | null, apiResponse?: T | null): void;
}
export type GenericBackupPromise<T> = [Backup, T];
export type DeleteBackupCallback = (err: ServiceError | null, apiResponse?: IEmpty) => void;
export type DeleteBackupResponse = [IEmpty];
export type BackupExistsCallback = (err: ServiceError | null, exists?: boolean) => void;
export type BackupExistsResponse = [boolean];
export type GetBackupCallback = GenericBackupCallback<IBackup>;
export type GetBackupResponse = [Backup, IBackup];
export type BackupGetMetadataCallback = (err?: ServiceError | null, metadata?: IBackup | null) => void;
export type BackupGetMetadataResponse = [IBackup];
export type BackupSetMetadataCallback = (err: ServiceError | null, metadata: IBackup, resp: IBackup) => void;
export type BackupSetMetadataResponse = [IBackup, IBackup];
export interface RestoreTableConfig {
    tableId: string;
    instance?: Instance | string;
    gaxOptions?: CallOptions;
}
export type RestoreTableCallback = (err: ServiceError | null, table?: Table, operation?: Operation, apiResponse?: IOperation) => void;
export type RestoreTableResponse = [Table, Operation, IOperation];
export interface GetBackupsOptions {
    /**
     * A filter expression that filters backups listed in the response. The
     * expression must specify the field name, a comparison operator, and the
     * value that you want to use for filtering. The value must be a string, a
     * number, or a boolean. The comparison operator must be <, >, <=, >=, !=, =,
     * or :. Colon ‘:’ represents a HAS operator which is roughly synonymous with
     * equality. Filter rules are case insensitive.
     */
    filter?: string;
    /**
     * An expression for specifying the sort order of the results of the request.
     * The string value should specify one or more fields in
     * {@link google.bigtable.admin.v2.Backup|Backup}. The full syntax is
     * described at https://aip.dev/132#ordering.
     */
    orderBy?: string;
    gaxOptions?: CallOptions;
    pageSize?: number;
    pageToken?: string;
    autoPaginate?: boolean;
}
export type GetBackupsResponse = [
    Backup[],
    GetBackupsOptions,
    google.bigtable.admin.v2.IListBackupsResponse
];
export type GetBackupsCallback = (err: ServiceError | null, backups?: Backup[], nextQuery?: GetBackupsOptions, apiResponse?: google.bigtable.admin.v2.IListBackupsResponse) => void;
/**
 * Interact with backups like get detailed information from BigTable, create
 * a backup, or restore a backup to a table.
 *
 * @class
 * @param {Cluster} cluster The parent instance of this backup.
 * @param {string} name Name of the backup.
 *
 * @example
 * ```
 * const {Bigtable} = require('@google-cloud/bigtable');
 * const bigtable = new Bigtable();
 * const instance = bigtable.instance('my-instance');
 * const cluster = instance.cluster('my-cluster');
 * const backup = cluster.backup('my-backup');
 * ```
 */
export declare class Backup {
    bigtable: Bigtable;
    cluster: Cluster;
    /**
     * A unique backup string, e.g. "my-backup".
     */
    id: string;
    /**
     * The full path of the backup which is in the form of:
     *  `projects/{project}/instances/{instance}/clusters/{cluster}/backups/{backup}`.
     */
    name: string;
    metadata?: IBackup;
    /**
     * @param {Cluster} cluster
     * @param {string} id The backup name or id.
     */
    constructor(cluster: Cluster, id: string);
    /**
     * A Date-compatible PreciseDate representing the time that the backup was
     * finished.
     * @readonly
     * @return {PreciseDate}
     */
    get endDate(): PreciseDate;
    /**
     * A Date-compatible PreciseDate representing the expiration time of this
     * backup.
     * @readonly
     * @return {PreciseDate}
     */
    get expireDate(): PreciseDate;
    /**
     * A Date-compatible PreciseDate representing the time that this backup was
     * started.
     * @readonly
     * @return {PreciseDate}
     */
    get startDate(): PreciseDate;
    /**
     * When this backup object represents a backup that has already been created,
     * copy will copy this created backup to the location and with the settings
     * specified by the config parameter. After running this function the original
     * backup will exist as well as a second backup matching the parameters given
     * by the config argument.
     *
     * @param {CopyBackupConfig} [config] The config that specifies all of the
     * information about the destination backup which is the new backup that gets
     * created as a result of calling copy.
     * @param {CopyBackupCallback} [callback] The callback function that passes an
     * error or results back to the user.
     */
    copy(config: CopyBackupConfig, callback: CopyBackupCallback): void;
    copy(config: CopyBackupConfig): Promise<CopyBackupResponse>;
    create(config: CreateBackupConfig, callback?: CreateBackupCallback): void;
    create(config: CreateBackupConfig): Promise<CreateBackupResponse>;
    delete(gaxOptions?: CallOptions): Promise<DeleteBackupResponse>;
    delete(callback: DeleteBackupCallback): void;
    delete(gaxOptions: CallOptions, callback: DeleteBackupCallback): void;
    exists(gaxOptions?: CallOptions): Promise<BackupExistsResponse>;
    exists(gaxOptions: CallOptions, callback: BackupExistsCallback): void;
    exists(callback: BackupExistsCallback): void;
    get(gaxOptions?: CallOptions): Promise<GetBackupResponse>;
    get(callback: GetBackupCallback): void;
    get(gaxOptions: CallOptions, callback: GetBackupCallback): void;
    getIamPolicy(options?: GetIamPolicyOptions): Promise<GetIamPolicyResponse>;
    getIamPolicy(options: GetIamPolicyOptions, callback: GetIamPolicyCallback): void;
    getMetadata(gaxOptions?: CallOptions): Promise<BackupGetMetadataResponse>;
    getMetadata(callback: BackupGetMetadataCallback): void;
    getMetadata(gaxOptions: CallOptions, callback: BackupGetMetadataCallback): void;
    restore(tableId: string, gaxOptions?: CallOptions): Promise<RestoreTableResponse>;
    restore(tableId: string, gaxOptions: CallOptions, callback: RestoreTableCallback): void;
    restore(tableId: string, callback: RestoreTableCallback): void;
    restoreTo(config: RestoreTableConfig): Promise<RestoreTableResponse>;
    restoreTo(config: RestoreTableConfig, callback: RestoreTableCallback): void;
    setIamPolicy(policy: Policy, gaxOptions?: CallOptions): Promise<SetIamPolicyResponse>;
    setIamPolicy(policy: Policy, gaxOptions: CallOptions, callback: SetIamPolicyCallback): void;
    setIamPolicy(policy: Policy, callback: SetIamPolicyCallback): void;
    setMetadata(metadata: ModifiableBackupFields, gaxOptions?: CallOptions): Promise<BackupSetMetadataResponse>;
    setMetadata(metadata: ModifiableBackupFields, callback: BackupSetMetadataCallback): void;
    setMetadata(metadata: ModifiableBackupFields, gaxOptions: CallOptions, callback: BackupSetMetadataCallback): void;
    testIamPermissions(permissions: string | string[], gaxOptions?: CallOptions): Promise<TestIamPermissionsResponse>;
    testIamPermissions(permissions: string | string[], callback: TestIamPermissionsCallback): void;
    testIamPermissions(permissions: string | string[], gaxOptions: CallOptions, callback: TestIamPermissionsCallback): void;
}
export {};
/**
 * Reference to the {@link Backup} class.
 * @name module:@google-cloud/bigtable.Backup
 * @see Backup
 */
