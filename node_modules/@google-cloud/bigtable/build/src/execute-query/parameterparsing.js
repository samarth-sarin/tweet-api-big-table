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
exports.parseParameters = parseParameters;
exports.parseParameterTypes = parseParameterTypes;
exports.setTypeField = setTypeField;
exports.executeQueryTypeToPBType = executeQueryTypeToPBType;
exports.convertJsValueToValue = convertJsValueToValue;
const precise_date_1 = require("@google-cloud/precise-date");
const values_1 = require("./values");
const SqlTypes = require("./types");
const is = require("is");
const Long = require("long");
/**
 * Creates protobuf objects with explicit types from passed parameters.
 * The protobuf Value objects have a field describing their type explicitly.
 * For each param we create a Value object based on the provided type.
 * @param parameters map from parameter name to parameter value
 * @param parameter_types map from parameter name to parameter type
 * @returns map from parameter name to a Value object
 */
function parseParameters(parameters, parameterTypes) {
    // Assert both objects contain the same keys:
    const parameterKeys = Object.keys(parameters);
    const parameterTypeKeys = Object.keys(parameterTypes);
    if (parameterKeys.length !== parameterTypeKeys.length) {
        throw new Error(`Number of parameters (${parameterKeys.length}) does not match number of parameter types (${parameterTypeKeys.length}).`);
    }
    // if the numbers of keys match, but keys differ we will catch it in the next step
    const entries = [];
    for (const [key, value] of Object.entries(parameters)) {
        let type;
        if (Object.prototype.hasOwnProperty.call(parameterTypes, key)) {
            type = parameterTypes[key];
        }
        else {
            throw new Error(`Unrecognized parameter: ${key}`);
        }
        entries.push([key, setTypeField(convertJsValueToValue(value, type), type)]);
    }
    return Object.fromEntries(entries);
}
function parseParameterTypes(parameter_types) {
    return Object.fromEntries(Object.entries(parameter_types).map(([key, value]) => [
        key,
        executeQueryTypeToPBType(value),
    ]));
}
function inferType(value) {
    if (is.number(value)) {
        return SqlTypes.Float64();
    }
    else if (typeof value === 'bigint') {
        return SqlTypes.Int64();
    }
    else if (is.string(value)) {
        return SqlTypes.String();
    }
    else if (is.boolean(value)) {
        return SqlTypes.Bool();
    }
    else if (is.array(value)) {
        // eslint-disable-next-line
        throw new Error(`Cannot infer type of an array ${value}. Please provide a type hint using parameter_types.`);
    }
    else if (typeof value === 'object') {
        if (value instanceof Uint8Array) {
            return SqlTypes.Bytes();
        }
        else if (value instanceof precise_date_1.PreciseDate) {
            return SqlTypes.Timestamp();
        }
        else if (value instanceof Date) {
            throw new Error('Date is not supported as a parameter type. Please use PreciseDate for Sql TIMESTAMP or BigtableDate for SQL DATE');
        }
        else if (value instanceof values_1.BigtableDate) {
            return SqlTypes.Date();
        }
    }
    const typeString = typeof value;
    let prototypeString = null;
    if (typeString === 'object') {
        if (value === null) {
            prototypeString = 'null';
        }
        else {
            prototypeString = `constructor.name = ${value.constructor.name}`;
        }
    }
    const typeInfo = `typeof == ${typeString}${prototypeString ? `, ${prototypeString}` : ''})`;
    throw new Error(`Cannot infer type of ${value} (${typeInfo}). Please provide a type hint using parameter_types.`);
}
function setTypeField(value, type) {
    value.type = executeQueryTypeToPBType(type);
    return value;
}
function executeQueryTypeToPBType(type) {
    switch (type.type) {
        case 'string':
            return { stringType: {} };
        case 'int64':
            return { int64Type: {} };
        case 'float32':
            return { float32Type: {} };
        case 'float64':
            return { float64Type: {} };
        case 'bytes':
            return { bytesType: {} };
        case 'bool':
            return { boolType: {} };
        case 'timestamp':
            return { timestampType: {} };
        case 'date':
            return { dateType: {} };
        case 'array':
            return {
                arrayType: { elementType: executeQueryTypeToPBType(type.elementType) },
            };
        case 'struct':
            return {
                structType: {
                    fields: type.values.map((value, index) => ({
                        fieldName: type.getFieldNameAtIndex(index),
                        type: executeQueryTypeToPBType(value),
                    })),
                },
            };
        case 'map':
            return {
                mapType: {
                    keyType: executeQueryTypeToPBType(type.keyType),
                    valueType: executeQueryTypeToPBType(type.valueType),
                },
            };
    }
}
function convertJsValueToValue(value, type) {
    if (value === null) {
        return {};
    }
    switch (type.type) {
        case 'string':
            return convertToString(value);
        case 'int64':
            return convertToInt64(value);
        case 'float32':
            return convertToFloat64(value);
        case 'float64':
            return convertToFloat64(value);
        case 'bytes':
            return convertToBytes(value);
        case 'bool':
            return convertToBool(value);
        case 'timestamp':
            return convertToTimestamp(value);
        case 'date':
            return convertToDate(value);
        case 'array':
            return convertToArray(value, type);
        case 'struct':
            throw new Error('Struct is not a supported query param type');
        case 'map':
            throw new Error('Map is not a supported query param type');
    }
}
function convertToString(value) {
    if (is.string(value)) {
        return { stringValue: value };
    }
    throw new Error(`Value ${value} cannot be converted to string.`);
}
const MAX_LONG = BigInt(Long.MAX_VALUE.toString());
const MIN_LONG = BigInt(Long.MIN_VALUE.toString());
function bigintToLong(value) {
    // Long fromString does not check this
    if (value > MAX_LONG || value < MIN_LONG) {
        throw new Error(`Value ${value} cannot be converted to int64 - it is out of range.`);
    }
    return Long.fromString(value.toString());
}
function convertToInt64(value) {
    if (typeof value === 'bigint') {
        return {
            intValue: bigintToLong(value),
        };
    }
    else if (typeof value === 'number') {
        throw new Error(`Value ${value} cannot be converted to int64 - argument of type INT64 should by passed as BigInt.`);
    }
    throw new Error(`Value ${value} cannot be converted to int64.`);
}
function convertToFloat64(value) {
    if (typeof value === 'number') {
        return { floatValue: value };
    }
    throw new Error(`Value ${value} cannot be converted to float64.`);
}
function convertToBytes(value) {
    if (typeof value === 'object' && value instanceof Uint8Array) {
        return { bytesValue: value };
    }
    throw new Error(`Value ${value} cannot be converted to bytes.`);
}
function convertToBool(value) {
    if (typeof value === 'boolean') {
        return { boolValue: value };
    }
    throw new Error(`Value ${value} cannot be converted to boolean.`);
}
function convertToTimestamp(value) {
    if (typeof value === 'object' && value instanceof precise_date_1.PreciseDate) {
        return { timestampValue: value.toStruct() };
    }
    throw new Error(`Value ${value} cannot be converted to timestamp, please use PreciseDate instead.`);
}
function convertToDate(value) {
    if (typeof value === 'object' && value instanceof values_1.BigtableDate) {
        return { dateValue: value };
    }
    throw new Error(`Value ${value} cannot be converted to date.`);
}
function convertToArray(value, type) {
    if (!is.array(value)) {
        throw new Error(`Value ${value} cannot be converted to an array.`);
    }
    const arrayValue = value;
    return {
        arrayValue: {
            values: arrayValue.map((element, index) => {
                try {
                    return convertJsValueToValue(element, type.elementType);
                    // eslint-disable-next-line
                }
                catch (conversionError) {
                    if (conversionError instanceof Error) {
                        throw new Error(`Error while converting element ${index} of an array: ${conversionError.message}`);
                    }
                    else {
                        throw conversionError;
                    }
                }
            }),
        },
    };
}
//# sourceMappingURL=parameterparsing.js.map