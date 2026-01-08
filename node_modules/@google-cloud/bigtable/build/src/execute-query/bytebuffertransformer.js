"use strict";
// Copyright 2025 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.ByteBufferTransformer = void 0;
const stream_1 = require("stream");
const SqlValues = require("./values");
/**
 * stream.Transform which buffers bytes from `ExecuteQuery` responses until
 * resumeToken is received. At that point all buffered messages are passed
 * forward.
 */
class ByteBufferTransformer extends stream_1.Transform {
    messageQueue = [];
    messageBuffer = [];
    protoBytesEncoding;
    constructor(protoBytesEncoding) {
        super({ objectMode: true, highWaterMark: 0 });
        this.protoBytesEncoding = protoBytesEncoding;
    }
    resetQueueAndBuffer = (estimatedBatchSize) => {
        this.messageQueue = [];
        this.messageBuffer = new Array(estimatedBatchSize || 0);
    };
    flushMessageBuffer = (batchChecksum, estimatedBatchSize) => {
        if (this.messageBuffer.length === 0) {
            throw new Error('Recieved empty batch with non-zero checksum.');
        }
        const newBatch = Buffer.concat(this.messageBuffer);
        if (!SqlValues.checksumValid(newBatch, batchChecksum)) {
            throw new Error('Failed to validate next batch of results');
        }
        this.messageQueue.push(newBatch);
        this.messageBuffer = new Array(estimatedBatchSize || 0);
    };
    pushMessages = (resumeToken) => {
        const token = SqlValues.ensureUint8Array(resumeToken, this.protoBytesEncoding);
        if (this.messageBuffer.length !== 0) {
            throw new Error('Recieved incomplete batch of rows.');
        }
        this.push([this.messageQueue, token]);
        this.messageBuffer = [];
        this.messageQueue = [];
    };
    /**
     * Process a `PartialResultSet` message from the server.
     * For more info refer to the PartialResultSet protobuf definition.
     * @param partialResultSet The `PartialResultSet` message to process.
     */
    processProtoRowsBatch = (partialResultSet) => {
        let handled = false;
        if (partialResultSet.reset) {
            this.resetQueueAndBuffer(partialResultSet.estimatedBatchSize);
            handled = true;
        }
        if (partialResultSet.protoRowsBatch?.batchData?.length) {
            this.messageBuffer.push(SqlValues.ensureUint8Array(partialResultSet.protoRowsBatch.batchData, this.protoBytesEncoding));
            handled = true;
        }
        if (partialResultSet.batchChecksum) {
            this.flushMessageBuffer(partialResultSet.batchChecksum, partialResultSet.estimatedBatchSize);
            handled = true;
        }
        if (partialResultSet.resumeToken &&
            partialResultSet.resumeToken.length > 0) {
            this.pushMessages(partialResultSet.resumeToken);
            handled = true;
        }
        if (!handled) {
            throw new Error('Response did not contain any results!');
        }
    };
    _transform(chunk, _encoding, callback) {
        let maybeError = null;
        const reponse = chunk;
        try {
            switch (reponse.response) {
                case 'results': {
                    this.processProtoRowsBatch(reponse.results);
                    break;
                }
                default:
                    throw Error(`Response contains unknown type ${reponse.response}`);
            }
        }
        catch (error) {
            maybeError = new Error(`Internal Error. Failed to process response: ${error}`);
        }
        callback(maybeError);
    }
    _flush(callback) {
        if (this.messageBuffer.length > 0) {
            callback(new Error('Internal Error. Last message did not contain a resumeToken.'));
            return;
        }
        callback(null);
    }
}
exports.ByteBufferTransformer = ByteBufferTransformer;
//# sourceMappingURL=bytebuffertransformer.js.map