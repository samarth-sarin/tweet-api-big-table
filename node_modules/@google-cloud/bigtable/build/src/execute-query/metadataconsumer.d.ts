import * as Types from './types';
import { google } from '../../protos/protos';
/**
 * This class keeps and parses the metadata.
 */
export declare class MetadataConsumer {
    private metadata;
    constructor();
    getMetadata: () => Types.ResultSetMetadata | null;
    consume: (new_metadata: Types.ResultSetMetadata) => void;
    static parsePBType(type: google.bigtable.v2.Type): Types.Type;
    static parseMetadata(metadata: google.bigtable.v2.IResultSetMetadata): Types.ResultSetMetadata;
}
