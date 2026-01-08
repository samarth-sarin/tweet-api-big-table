import { google } from '../../protos/protos';
import { ExecuteQueryStreamWithMetadata, SqlValue } from './values';
import { ResultSetMetadata, Type } from './types';
import { Transform, TransformCallback, TransformOptions } from 'stream';
import { MetadataConsumer } from './metadataconsumer';
import { FieldMapping } from './namedlist';
/**
 * Class representing a readable stream with ExecuteQuery results
 * which also lets the caller get metadata.
 */
export declare class ExecuteQueryStreamTransformWithMetadata extends Transform implements ExecuteQueryStreamWithMetadata {
    metadataConsumer: MetadataConsumer;
    fieldMapping: FieldMapping | null;
    hasCallerCancelled: () => boolean;
    protoBytesEncoding?: BufferEncoding;
    constructor(metadataConsumer: MetadataConsumer, hasCallerCancelled: () => boolean, protoBytesEncoding?: BufferEncoding, opts?: TransformOptions);
    valueToJsType(value: google.bigtable.v2.Value, metadata: Type): SqlValue;
    valueToJsArray(value: google.bigtable.v2.Value, metadata: Type): SqlValue;
    valueToJsStruct(value: google.bigtable.v2.Value, metadata: Type): SqlValue;
    valueToJsMap(value: google.bigtable.v2.Value, metadata: Type): SqlValue;
    getFieldMapping(): FieldMapping;
    _transform(chunk: Array<google.bigtable.v2.Value>, _encoding: BufferEncoding, callback: TransformCallback): void;
    getMetadata(): ResultSetMetadata | null;
}
