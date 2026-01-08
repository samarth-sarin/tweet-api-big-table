import { GoogleError, ServiceError } from 'google-gax';
export declare const RETRYABLE_STATUS_CODES: Set<number>;
export declare const DEFAULT_RETRY_COUNT = 10;
export declare const IGNORED_STATUS_CODES: Set<number>;
/**
 * Checks if the error is an "expired query plan" error.
 * For more info refer to the ExecuteQueryStateMachine
 * @param error
 */
export declare const isExpiredQueryError: (error: GoogleError | ServiceError) => boolean;
/**
 * Checks if the error is a cancel error - caused by aborting the stream.
 * @param error
 */
export declare function isCancelError(error: ServiceError): boolean;
