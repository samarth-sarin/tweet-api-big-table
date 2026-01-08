import { Transform, TransformCallback } from 'stream';
import { google } from '../../protos/protos';
/**
 * stream.Transform which buffers bytes from `ExecuteQuery` responses until
 * resumeToken is received. At that point all buffered messages are passed
 * forward.
 */
export declare class ByteBufferTransformer extends Transform {
    private messageQueue;
    private messageBuffer;
    private protoBytesEncoding?;
    constructor(protoBytesEncoding?: BufferEncoding);
    private resetQueueAndBuffer;
    private flushMessageBuffer;
    private pushMessages;
    /**
     * Process a `PartialResultSet` message from the server.
     * For more info refer to the PartialResultSet protobuf definition.
     * @param partialResultSet The `PartialResultSet` message to process.
     */
    private processProtoRowsBatch;
    _transform(chunk: google.bigtable.v2.ExecuteQueryResponse, _encoding: BufferEncoding, callback: TransformCallback): void;
    _flush(callback: TransformCallback): void;
}
