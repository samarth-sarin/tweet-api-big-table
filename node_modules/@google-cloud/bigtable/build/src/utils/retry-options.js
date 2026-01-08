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
exports.isExpiredQueryError = exports.IGNORED_STATUS_CODES = exports.DEFAULT_RETRY_COUNT = exports.RETRYABLE_STATUS_CODES = void 0;
exports.isCancelError = isCancelError;
const google_gax_1 = require("google-gax");
exports.RETRYABLE_STATUS_CODES = new Set([
    google_gax_1.grpc.status.DEADLINE_EXCEEDED.valueOf(),
    google_gax_1.grpc.status.UNAVAILABLE.valueOf(),
]);
exports.DEFAULT_RETRY_COUNT = 10;
exports.IGNORED_STATUS_CODES = new Set([google_gax_1.grpc.status.CANCELLED.valueOf()]);
function containsPreparedQueryExpired(violations) {
    if (!Array.isArray(violations) || violations.length === 0) {
        return false;
    }
    for (const obj of violations) {
        if (obj.violations && Array.isArray(obj.violations)) {
            for (const violation of obj.violations) {
                if (violation.type === 'PREPARED_QUERY_EXPIRED') {
                    return true;
                }
            }
        }
    }
    return false;
}
/**
 * Checks if the error is an "expired query plan" error.
 * For more info refer to the ExecuteQueryStateMachine
 * @param error
 */
const isExpiredQueryError = (error) => {
    if (error.code === google_gax_1.grpc.status.FAILED_PRECONDITION &&
        Object.prototype.hasOwnProperty.call(error, 'statusDetails')) {
        const statusDetails = error
            .statusDetails;
        return containsPreparedQueryExpired(statusDetails);
    }
    return false;
};
exports.isExpiredQueryError = isExpiredQueryError;
/**
 * Checks if the error is a cancel error - caused by aborting the stream.
 * @param error
 */
function isCancelError(error) {
    return error.code === google_gax_1.grpc.status.CANCELLED.valueOf();
}
//# sourceMappingURL=retry-options.js.map