import { google } from '../../protos/protos';
import { ExecuteQueryParameterValue } from './values';
import * as SqlTypes from './types';
/**
 * Creates protobuf objects with explicit types from passed parameters.
 * The protobuf Value objects have a field describing their type explicitly.
 * For each param we create a Value object based on the provided type.
 * @param parameters map from parameter name to parameter value
 * @param parameter_types map from parameter name to parameter type
 * @returns map from parameter name to a Value object
 */
export declare function parseParameters(parameters: {
    [param: string]: ExecuteQueryParameterValue;
}, parameterTypes: {
    [param: string]: SqlTypes.Type;
}): {
    [param: string]: google.bigtable.v2.IValue;
};
export declare function parseParameterTypes(parameter_types: {
    [param: string]: SqlTypes.Type;
}): {
    [param: string]: google.bigtable.v2.IType;
};
export declare function setTypeField(value: google.bigtable.v2.IValue, type: SqlTypes.Type): google.bigtable.v2.IValue;
export declare function executeQueryTypeToPBType(type: SqlTypes.Type): google.bigtable.v2.IType;
export declare function convertJsValueToValue(value: ExecuteQueryParameterValue, type: SqlTypes.Type): google.bigtable.v2.IValue;
