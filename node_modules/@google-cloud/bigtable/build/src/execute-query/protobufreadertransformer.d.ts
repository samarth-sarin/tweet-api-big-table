import { Transform, TransformOptions, TransformCallback } from 'stream';
import { MetadataConsumer } from './metadataconsumer';
declare class DrainGuard {
    callback: () => void;
    constructor(callback: () => void);
}
export type BatchAndToken = [Buffer[], Uint8Array];
/**
 * This transformer is responsible for deserializing bytes sent from the
 * server to an appropriate object which can be used to construct rows.
 * Right now only google.bigtable.v2.ProtoRows is supported.
 */
export declare class ProtobufReaderTransformer extends Transform {
    metadataConsumer: MetadataConsumer;
    resumeToken: Uint8Array | null;
    constructor(metadataConsumer: MetadataConsumer, opts?: TransformOptions);
    _transform(batchAndToken: BatchAndToken | DrainGuard, _encoding: BufferEncoding, callback: TransformCallback): void;
    /**
     * @param callback guaranteed to be called **after** the last message
     * was processed.
     */
    onDrain: (callback: () => void) => void;
}
export {};
