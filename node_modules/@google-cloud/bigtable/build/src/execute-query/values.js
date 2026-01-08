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
exports.EncodedKeyMap = exports.Struct = exports.QueryResultRow = exports.BigtableDate = void 0;
exports.checksumValid = checksumValid;
exports.ensureUint8Array = ensureUint8Array;
const namedlist_1 = require("./namedlist");
// fast-crc32c will segfault on import on non-x64 architectures, due to a
// lack of SSE instructions.
const CRC32C = process.arch === 'x64'
    ? require('fast-crc32c')
    : require('fast-crc32c/impls/js_crc32c');
/**
 * A custom class created to allow setting year, month and date to 0.
 */
class BigtableDate {
    year;
    month;
    day;
    constructor(year, month, day) {
        if (year < 0) {
            throw new Error('Invalid year.');
        }
        this.year = year;
        if (month < 0 || month > 12) {
            throw new Error('Invalid month.');
        }
        this.month = month;
        if (day < 0 || day > 31) {
            throw new Error('Invalid month.');
        }
        this.day = day;
    }
}
exports.BigtableDate = BigtableDate;
class QueryResultRow extends namedlist_1.NamedList {
}
exports.QueryResultRow = QueryResultRow;
class Struct extends namedlist_1.NamedList {
    static fromTuples(tuples) {
        return namedlist_1.NamedList._fromTuples(Struct, tuples);
    }
}
exports.Struct = Struct;
function checksumValid(buffer, expectedChecksum) {
    return CRC32C.calculate(buffer) === expectedChecksum;
}
function ensureUint8Array(bytes, encoding) {
    return bytes instanceof Uint8Array
        ? bytes
        : Buffer.from(bytes, encoding || 'base64');
}
function _parseBufferToMapKey(key) {
    // Uint8Array is always an instance of Buffer,
    // but we keep it in the if condition for TS linter's sake
    if (key instanceof Buffer || key instanceof Uint8Array) {
        const base64Key = key.toString('base64');
        return base64Key;
    }
    else if (key === null) {
        return null;
    }
    else {
        return key;
    }
}
class EncodedKeyMap {
    map_impl;
    /**
     * Class representing a Map Value returned by ExecuteQuery. Native JS Map
     * does not support Buffer comparison - it compares object id and not
     * buffer values. This class solves this by encoding Buffer keys as
     * base64 strings.
     * Please note that an empty string and an empty buffer have the same
     * representation, however, we do not ever use mixed key types (all keys are
     * always all buffers or all strings) so we don't need to handle this.
     */
    constructor(entries) {
        if (entries) {
            // Process entries to encode Buffer keys as base64
            const processedEntries = entries.map(([key, value]) => {
                return [_parseBufferToMapKey(key), [key, value]];
            });
            this.map_impl = new Map(processedEntries);
        }
        else {
            this.map_impl = new Map();
        }
    }
    clear() {
        this.map_impl.clear();
    }
    delete(key) {
        return this.map_impl.delete(_parseBufferToMapKey(key));
    }
    forEach(callbackfn, thisArg) {
        this.map_impl.forEach((value, key) => {
            callbackfn.call(thisArg, value[1], value[0], this.map_impl);
        });
    }
    has(key) {
        return this.map_impl.has(_parseBufferToMapKey(key));
    }
    get size() {
        return this.map_impl.size;
    }
    entries() {
        return this.map_impl.values();
    }
    keys() {
        const iterator = this.map_impl.values();
        return {
            next: () => {
                const result = iterator.next();
                if (result.done)
                    return result;
                return { value: result.value[0], done: false };
            },
            [Symbol.iterator]() {
                return this;
            },
        };
    }
    values() {
        const iterator = this.map_impl.values();
        return {
            next: () => {
                const result = iterator.next();
                if (result.done)
                    return result;
                return { value: result.value[1], done: false };
            },
            [Symbol.iterator]() {
                return this;
            },
        };
    }
    [Symbol.iterator]() {
        return this.entries();
    }
    get [Symbol.toStringTag]() {
        return 'EncodedKeyMap';
    }
    get(key) {
        return this.map_impl.get(_parseBufferToMapKey(key))?.[1];
    }
    set(key, value) {
        this.map_impl.set(_parseBufferToMapKey(key), [key, value]);
        return this;
    }
}
exports.EncodedKeyMap = EncodedKeyMap;
//# sourceMappingURL=values.js.map