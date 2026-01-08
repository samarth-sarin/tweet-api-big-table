import { PassThrough, TransformCallback, TransformOptions } from 'stream';
/**
 * This interface is the usual options that can be passed into a Transform plus
 * a hook for injecting code into the stream's transform function. This hook is
 * useful for code running code that normally runs in the transform method if that
 * code is different for each method that makes use of a stream.
 */
type TimedStreamOptions = TransformOptions & {
    transformHook?: (event: any, _encoding: BufferEncoding, callback: TransformCallback) => void;
};
/**
 * The TimedStream class is used for measuring the time the user spends
 * processing data from the stream. We need to measure this time for use cases
 * like measuring the application latencies for client side metrics.
 */
export declare class TimedStream extends PassThrough {
    private readTimer;
    private transformTimer;
    constructor(options?: TimedStreamOptions);
    /**
     * read code is called when a row is consumed.
     */
    read(size: number): any;
    /**
     * Returns the total amount of time the user code spends handling data.
     */
    getTotalDurationMs(): number;
}
export {};
