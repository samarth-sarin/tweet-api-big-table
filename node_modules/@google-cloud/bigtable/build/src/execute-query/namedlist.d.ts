/**
 * Represents how field names correspond to field indexes in a NamedList.
 */
export type FieldMapping = {
    validFieldNames: Map<string, number>;
    duplicateFieldNames: Map<string, number[]>;
    fieldNames: (string | null)[];
};
/**
 * Class representing a list which allows retrieving elements both by index
 * and by name. If multiple elements have the same name, they have to be
 * retrieved by index. Otherwise an error is thrown.
 */
export declare class NamedList<T> {
    values: Array<T>;
    fieldMapping: FieldMapping;
    constructor(values: Array<T>, fieldMapping: FieldMapping);
    protected static _fromTuples<R extends NamedList<T>, T>(type: {
        new (values: Array<T>, fieldMapping: FieldMapping): R;
    }, tuples: [string | null, T][]): R;
    get(indexOrName: string | number): T;
    getFieldNameAtIndex(index: number): string | null;
}
