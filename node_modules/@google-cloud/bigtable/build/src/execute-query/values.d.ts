import { Duplex } from 'stream';
import * as SqlTypes from './types';
import { PreciseDate } from '@google-cloud/precise-date';
import { NamedList } from './namedlist';
export type BigtableMap = EncodedKeyMap;
export type ExecuteQueryParameterValue = Uint8Array | string | bigint | number | boolean | PreciseDate | BigtableDate | Array<ExecuteQueryParameterValue> | null;
export type SqlValue = ExecuteQueryParameterValue | Struct | Array<SqlValue> | BigtableMap;
/**
 * A custom class created to allow setting year, month and date to 0.
 */
export declare class BigtableDate {
    year: number;
    month: number;
    day: number;
    constructor(year: number, month: number, day: number);
}
export declare class QueryResultRow extends NamedList<SqlValue> {
}
export declare class Struct extends NamedList<SqlValue> {
    static fromTuples(tuples: [string | null, SqlValue][]): Struct;
}
export interface ExecuteQueryStreamWithMetadata extends Duplex {
    getMetadata: () => SqlTypes.ResultSetMetadata | null;
    end: () => this;
}
export declare function checksumValid(buffer: Buffer, expectedChecksum: number): boolean;
export declare function ensureUint8Array(bytes: Uint8Array | string, encoding?: BufferEncoding): Uint8Array;
export declare class EncodedKeyMap implements Map<bigint | string | Uint8Array | null, SqlValue> {
    private map_impl;
    /**
     * Class representing a Map Value returned by ExecuteQuery. Native JS Map
     * does not support Buffer comparison - it compares object id and not
     * buffer values. This class solves this by encoding Buffer keys as
     * base64 strings.
     * Please note that an empty string and an empty buffer have the same
     * representation, however, we do not ever use mixed key types (all keys are
     * always all buffers or all strings) so we don't need to handle this.
     */
    constructor(entries?: ReadonlyArray<[
        bigint | string | Uint8Array | null,
        SqlValue
    ]> | null);
    clear(): void;
    delete(key: string | bigint | Uint8Array | null): boolean;
    forEach(callbackfn: (value: SqlValue, key: string | bigint | Uint8Array | null, map: Map<string | bigint | Uint8Array | null, SqlValue>) => void, thisArg?: any): void;
    has(key: string | bigint | Uint8Array | null): boolean;
    get size(): number;
    entries(): MapIterator<[string | bigint | Uint8Array | null, SqlValue]>;
    keys(): MapIterator<string | bigint | Uint8Array | null>;
    values(): MapIterator<SqlValue>;
    [Symbol.iterator](): MapIterator<[
        string | bigint | Uint8Array | null,
        SqlValue
    ]>;
    get [Symbol.toStringTag](): string;
    get(key: string | bigint | Uint8Array | null): SqlValue | undefined;
    set(key: string | bigint | Uint8Array | null, value: SqlValue): this;
}
