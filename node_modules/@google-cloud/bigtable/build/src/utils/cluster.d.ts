import * as protos from '../../protos/protos';
import { BasicClusterConfig, SetClusterMetadataOptions } from '../cluster';
import { google } from '../../protos/protos';
import { ModifiableBackupFields } from '../backup';
export declare class ClusterUtils {
    static noConfigError: string;
    static allConfigError: string;
    static incompleteConfigError: string;
    static validateClusterMetadata(metadata: SetClusterMetadataOptions): void;
    static getUpdateMask(metadata: SetClusterMetadataOptions): string[];
    static getClusterBaseConfigWithFullLocation(metadata: BasicClusterConfig, projectId: string, name: string | undefined): google.bigtable.admin.v2.ICluster;
    static getClusterBaseConfig(metadata: SetClusterMetadataOptions, name: string | undefined): google.bigtable.admin.v2.ICluster;
    static getClusterFromMetadata(metadata: SetClusterMetadataOptions, name: string): google.bigtable.admin.v2.ICluster;
    static getRequestFromMetadata(metadata: SetClusterMetadataOptions, name: string): protos.google.bigtable.admin.v2.IPartialUpdateClusterRequest;
    static formatBackupExpiryTime(backup: ModifiableBackupFields): void;
}
