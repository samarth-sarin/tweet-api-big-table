export declare enum StreamingState {
    STREAMING = "true",
    UNARY = "false"
}
/**
 * Represents the names of Bigtable methods. These are used as attributes for
 * metrics, allowing for differentiation of performance by method.
 */
export declare enum MethodName {
    READ_ROW = "Bigtable.ReadRow",
    READ_ROWS = "Bigtable.ReadRows",
    MUTATE_ROW = "Bigtable.MutateRow",
    CHECK_AND_MUTATE_ROW = "Bigtable.CheckAndMutateRow",
    READ_MODIFY_WRITE_ROW = "Bigtable.ReadModifyWriteRow",
    SAMPLE_ROW_KEYS = "Bigtable.SampleRowKeys",
    MUTATE_ROWS = "Bigtable.MutateRows"
}
