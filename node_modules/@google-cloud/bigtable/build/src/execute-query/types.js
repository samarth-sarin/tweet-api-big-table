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
exports.ResultSetMetadata = exports.Map = exports.Array = exports.Struct = exports.Date = exports.Timestamp = exports.Bool = exports.String = exports.Bytes = exports.Float32 = exports.Float64 = exports.Int64 = exports.StructType = void 0;
const namedlist_1 = require("./namedlist");
class StructType extends namedlist_1.NamedList {
    type = 'struct';
    static fromTuples(tuples) {
        return namedlist_1.NamedList._fromTuples(StructType, tuples);
    }
}
exports.StructType = StructType;
/**
 * Factory functions are provided instead of constants
 * for all types for coherence and for extensibility
 * (we need parameters at least for arrays, structs and maps)
 */
const Int64 = () => ({ type: 'int64' });
exports.Int64 = Int64;
const Float64 = () => ({ type: 'float64' });
exports.Float64 = Float64;
const Float32 = () => ({ type: 'float32' });
exports.Float32 = Float32;
const Bytes = () => ({ type: 'bytes' });
exports.Bytes = Bytes;
const String = () => ({ type: 'string' });
exports.String = String;
const Bool = () => ({ type: 'bool' });
exports.Bool = Bool;
const Timestamp = () => ({ type: 'timestamp' });
exports.Timestamp = Timestamp;
const Date = () => ({ type: 'date' });
exports.Date = Date;
const Struct = (...fields) => StructType.fromTuples(fields.map(value => [value.name, value.type]));
exports.Struct = Struct;
const Array = (elementType) => ({
    type: 'array',
    elementType,
});
exports.Array = Array;
const Map = (keyType, valueType) => ({
    type: 'map',
    keyType,
    valueType,
});
exports.Map = Map;
class ResultSetMetadata extends namedlist_1.NamedList {
    get columns() {
        return this.values;
    }
    static fromTuples(tuples) {
        return namedlist_1.NamedList._fromTuples(ResultSetMetadata, tuples);
    }
}
exports.ResultSetMetadata = ResultSetMetadata;
//# sourceMappingURL=types.js.map