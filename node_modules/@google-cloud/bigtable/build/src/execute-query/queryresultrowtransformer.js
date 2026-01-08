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
exports.ExecuteQueryStreamTransformWithMetadata = void 0;
const Long = require("long");
const values_1 = require("./values");
const precise_date_1 = require("@google-cloud/precise-date");
const assert = require("assert");
const stream_1 = require("stream");
/**
 * Class representing a readable stream with ExecuteQuery results
 * which also lets the caller get metadata.
 */
class ExecuteQueryStreamTransformWithMetadata extends stream_1.Transform {
    metadataConsumer;
    fieldMapping;
    hasCallerCancelled;
    protoBytesEncoding;
    constructor(metadataConsumer, hasCallerCancelled, protoBytesEncoding, opts) {
        super({ ...opts, objectMode: true, highWaterMark: 0 });
        this.fieldMapping = null;
        this.metadataConsumer = metadataConsumer;
        this.hasCallerCancelled = hasCallerCancelled;
        this.protoBytesEncoding = protoBytesEncoding;
    }
    valueToJsType(value, metadata) {
        if (!value.kind) {
            return null;
        }
        switch (metadata.type) {
            case 'bytes':
                if (value.kind === 'bytesValue') {
                    return (0, values_1.ensureUint8Array)(value.bytesValue, this.protoBytesEncoding);
                }
                break;
            case 'string':
                if (value.kind === 'stringValue') {
                    return value.stringValue;
                }
                break;
            case 'int64':
                if (value.kind === 'intValue') {
                    return intValueToBigInt(value.intValue);
                }
                break;
            case 'bool':
                if (value.kind === 'boolValue') {
                    return value.boolValue;
                }
                break;
            case 'float32':
            case 'float64':
                if (value.kind === 'floatValue') {
                    return value.floatValue;
                }
                break;
            case 'timestamp':
                if (value.kind === 'timestampValue') {
                    return new precise_date_1.PreciseDate({
                        seconds: value.timestampValue.seconds ?? undefined,
                        nanos: value.timestampValue.nanos ?? undefined,
                    });
                }
                break;
            case 'date':
                if (value.kind === 'dateValue') {
                    return new values_1.BigtableDate(value.dateValue.year || 0, value.dateValue.month || 0, value.dateValue.day || 0);
                }
                break;
            case 'array':
                return this.valueToJsArray(value, metadata);
            case 'struct':
                return this.valueToJsStruct(value, metadata);
            case 'map':
                return this.valueToJsMap(value, metadata);
            default:
                throw new Error(`Unexpected type to parse: ${JSON.stringify(metadata)}`);
        }
        throw new Error(`Metadata and Value not matching.
    Metadata:${metadata}
    Value:${value}`);
    }
    valueToJsArray(value, metadata) {
        assert(metadata.type === 'array');
        if (value.arrayValue === null ||
            value.arrayValue === undefined ||
            value.arrayValue.values === null ||
            value.arrayValue.values === undefined) {
            return null;
        }
        return value.arrayValue.values.map(value => this.valueToJsType(value, metadata.elementType));
    }
    valueToJsStruct(value, metadata) {
        assert(metadata.type === 'struct');
        if (value.arrayValue === null ||
            value.arrayValue === undefined ||
            value.arrayValue.values === null ||
            value.arrayValue.values === undefined) {
            return null;
        }
        if (value.arrayValue.values.length !== metadata.values.length) {
            throw new Error(`Internal error - received Struct with ${value.arrayValue.values.length} values, but metadata has ${metadata.values.length} fields.`);
        }
        return new values_1.Struct(value.arrayValue.values.map((value, index) => this.valueToJsType(value, metadata.get(index))), metadata.fieldMapping);
    }
    valueToJsMap(value, metadata) {
        assert(metadata.type === 'map');
        if (value.arrayValue === null ||
            value.arrayValue === undefined ||
            value.arrayValue.values === null ||
            value.arrayValue.values === undefined) {
            return null;
        }
        if (metadata.keyType.type !== 'int64' &&
            metadata.keyType.type !== 'string' &&
            metadata.keyType.type !== 'bytes') {
            throw new Error(`Internal error - unsupported type of key received: ${metadata.keyType.type}`);
        }
        const values = value.arrayValue
            .values;
        return new values_1.EncodedKeyMap(values.map(value => {
            // Types are ensured by checking metadata.keyType.type earlier.
            const pair = value?.arrayValue?.values;
            const keyValue = this.valueToJsType(pair[0], metadata.keyType);
            return [keyValue, this.valueToJsType(pair[1], metadata.valueType)];
        }));
    }
    getFieldMapping() {
        if (this.fieldMapping === null) {
            const metadata = this.getMetadata();
            if (metadata === null) {
                throw new Error('Metadata was not sent by the server.');
            }
            this.fieldMapping = metadata.fieldMapping;
        }
        return this.fieldMapping;
    }
    _transform(chunk, _encoding, callback) {
        let error = null;
        try {
            if (!this.hasCallerCancelled()) {
                const maybeMetadata = this.metadataConsumer.getMetadata();
                if (maybeMetadata) {
                    this.push(new values_1.QueryResultRow(chunk.map((value, index) => this.valueToJsType(value, maybeMetadata.get(index))), this.getFieldMapping()));
                }
                else {
                    throw new Error('Server error - expected to receive metadata by now.');
                }
            }
        }
        catch (e) {
            error = e;
        }
        callback(error);
    }
    getMetadata() {
        return this.metadataConsumer.getMetadata();
    }
}
exports.ExecuteQueryStreamTransformWithMetadata = ExecuteQueryStreamTransformWithMetadata;
function intValueToBigInt(intValue) {
    if (intValue instanceof Long) {
        return BigInt(intValue.toString());
    }
    return BigInt(intValue);
}
//# sourceMappingURL=queryresultrowtransformer.js.map