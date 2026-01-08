import { NamedList } from './namedlist';
export type ArrayType = {
    type: 'array';
    elementType: Type;
};
export type MapType = {
    type: 'map';
    keyType: Type;
    valueType: Type;
};
export type FieldType = {
    name: string | null;
    type: Type;
};
export declare class StructType extends NamedList<Type> {
    type: 'struct';
    static fromTuples(tuples: [string | null, Type][]): StructType;
}
export type Int64Type = ReturnType<typeof Int64>;
export type Float64Type = ReturnType<typeof Float64>;
export type Float32Type = ReturnType<typeof Float32>;
export type BytesType = ReturnType<typeof Bytes>;
export type StringType = ReturnType<typeof String>;
export type BoolType = ReturnType<typeof Bool>;
export type TimestampType = ReturnType<typeof Timestamp>;
export type DateType = ReturnType<typeof Date>;
/**
 * Factory functions are provided instead of constants
 * for all types for coherence and for extensibility
 * (we need parameters at least for arrays, structs and maps)
 */
export declare const Int64: () => {
    type: "int64";
};
export declare const Float64: () => {
    type: "float64";
};
export declare const Float32: () => {
    type: "float32";
};
export declare const Bytes: () => {
    type: "bytes";
};
export declare const String: () => {
    type: "string";
};
export declare const Bool: () => {
    type: "bool";
};
export declare const Timestamp: () => {
    type: "timestamp";
};
export declare const Date: () => {
    type: "date";
};
export declare const Struct: (...fields: FieldType[]) => StructType;
export declare const Array: (elementType: Type) => ArrayType;
export declare const Map: (keyType: Type, valueType: Type) => MapType;
export type Type = Int64Type | Float32Type | Float64Type | BytesType | StringType | BoolType | TimestampType | DateType | ArrayType | StructType | MapType;
export declare class ResultSetMetadata extends NamedList<Type> {
    get columns(): Array<Type>;
    static fromTuples(tuples: [string | null, Type][]): ResultSetMetadata;
}
