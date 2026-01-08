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
exports.mutateInternal = mutateInternal;
const table_1 = require("../table");
const tabular_api_surface_1 = require("../tabular-api-surface");
const is = require("is");
const mutation_1 = require("../mutation");
const arrify = require("arrify");
function mutateInternal(table, metricsCollector, entriesRaw, optionsOrCallback, cb) {
    const callback = typeof optionsOrCallback === 'function' ? optionsOrCallback : cb;
    const options = typeof optionsOrCallback === 'object' ? optionsOrCallback : {};
    const entries = arrify(entriesRaw).reduce((a, b) => a.concat(b), []);
    const collectMetricsCallback = (originalError, err, apiResponse) => {
        // originalError is the error that was sent from the gapic layer. The
        // compiler guarantees that it contains a code which needs to be
        // provided when an operation is marked complete.
        //
        // err is the error we intend to send back to the user. Often it is the
        // same as originalError, but in one case we construct a
        // PartialFailureError and send that back to the user instead. In this
        // case, we still need to pass the originalError into the method
        // because the PartialFailureError doesn't have a code, but we need to
        // communicate a code to the metrics collector.
        //
        const code = originalError ? originalError.code : 0;
        metricsCollector.onOperationComplete(code);
        callback(err, apiResponse);
    };
    /*
    The following line of code sets the timeout if it was provided while
    creating the client. This will be used to determine if the client should
    retry on errors. Eventually, this will be handled downstream in google-gax.
    */
    const timeout = options?.gaxOptions?.timeout ||
        (table?.bigtable?.options?.BigtableClient?.clientConfig?.interfaces &&
            table?.bigtable?.options?.BigtableClient?.clientConfig?.interfaces['google.bigtable.v2.Bigtable']?.methods['MutateRows']?.timeout_millis);
    const callTimeMillis = new Date().getTime();
    let numRequestsMade = 0;
    const maxRetries = is.number(table.maxRetries) ? table.maxRetries : 3;
    const pendingEntryIndices = new Set(entries.map((entry, index) => index));
    const entryToIndex = new Map(entries.map((entry, index) => [entry, index]));
    const mutationErrorsByEntryIndex = new Map();
    const isRetryable = (err, timeoutExceeded) => {
        if (timeoutExceeded) {
            // If the timeout has been exceeded then do not retry.
            return false;
        }
        // Don't retry if there are no more entries or retry attempts
        if (pendingEntryIndices.size === 0 || numRequestsMade >= maxRetries + 1) {
            return false;
        }
        // If the error is empty but there are still outstanding mutations,
        // it means that there are retryable errors in the mutate response
        // even when the RPC succeeded
        return !err || tabular_api_surface_1.RETRYABLE_STATUS_CODES.has(err.code);
    };
    const onBatchResponse = (err) => {
        // Return if the error happened before a request was made
        if (numRequestsMade === 0) {
            collectMetricsCallback(err, err);
            return;
        }
        const timeoutExceeded = !!(timeout && timeout < new Date().getTime() - callTimeMillis);
        if (isRetryable(err, timeoutExceeded)) {
            // If the timeout or max retries is exceeded or if there are no
            // pending indices left then the client doesn't retry.
            // Otherwise, the client will retry if there is no error or if the
            // error has a retryable status code.
            const backOffSettings = options.gaxOptions?.retry?.backoffSettings || tabular_api_surface_1.DEFAULT_BACKOFF_SETTINGS;
            const nextDelay = (0, tabular_api_surface_1.getNextDelay)(numRequestsMade, backOffSettings);
            metricsCollector.onAttemptComplete(err ? err.code : 0);
            setTimeout(makeNextBatchRequest, nextDelay);
            return;
        }
        // If there's no more pending mutations, set the error
        // to null
        if (pendingEntryIndices.size === 0) {
            err = null;
        }
        const mutationErrors = Array.from(mutationErrorsByEntryIndex.values());
        if (mutationErrorsByEntryIndex.size !== 0) {
            collectMetricsCallback(err, new table_1.PartialFailureError(mutationErrors, err));
            return;
        }
        if (err) {
            /* If there's an RPC level failure and the mutation entries don't have
               a status code, the RPC level failure error code will be used as the
               entry failure code.
              */
            err.errors =
                mutationErrors.concat([...pendingEntryIndices]
                    .filter(index => !mutationErrorsByEntryIndex.has(index))
                    .map(() => err));
            collectMetricsCallback(err, err);
            return;
        }
        collectMetricsCallback(null, null);
    };
    metricsCollector.onOperationStart();
    const makeNextBatchRequest = () => {
        metricsCollector.onAttemptStart();
        const entryBatch = entries.filter((entry, index) => {
            return pendingEntryIndices.has(index);
        });
        // If the viewName is provided then request will be made for an
        // authorized view. Otherwise, the request is made for a table.
        const baseReqOpts = (table.viewName
            ? {
                authorizedViewName: `${table.name}/authorizedViews/${table.viewName}`,
            }
            : {
                tableName: table.name,
            });
        const reqOpts = Object.assign(baseReqOpts, {
            appProfileId: table.bigtable.appProfileId,
            entries: options.rawMutation
                ? entryBatch
                : entryBatch.map(mutation_1.Mutation.parse),
        });
        const retryOpts = {
            currentRetryAttempt: numRequestsMade,
            // Handling retries in this client. Specify the retry options to
            // make sure nothing is retried in retry-request.
            noResponseRetries: 0,
            shouldRetryFn: (_) => {
                return false;
            },
        };
        options.gaxOptions = (0, tabular_api_surface_1.populateAttemptHeader)(numRequestsMade, options.gaxOptions);
        const requestStream = table.bigtable.request({
            client: 'BigtableClient',
            method: 'mutateRows',
            reqOpts,
            gaxOpts: options.gaxOptions,
            retryOpts,
        });
        metricsCollector.wrapRequest(requestStream);
        requestStream
            .on('error', (err) => {
            onBatchResponse(err);
        })
            .on('data', (obj) => {
            obj.entries.forEach(entry => {
                const originalEntry = entryBatch[entry.index];
                const originalEntriesIndex = entryToIndex.get(originalEntry);
                // Mutation was successful.
                if (entry.status.code === 0) {
                    pendingEntryIndices.delete(originalEntriesIndex);
                    mutationErrorsByEntryIndex.delete(originalEntriesIndex);
                    return;
                }
                if (!tabular_api_surface_1.RETRYABLE_STATUS_CODES.has(entry.status.code)) {
                    pendingEntryIndices.delete(originalEntriesIndex);
                }
                const errorDetails = entry.status;
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                errorDetails.entry = originalEntry;
                mutationErrorsByEntryIndex.set(originalEntriesIndex, errorDetails);
            });
        })
            .on('end', onBatchResponse);
        numRequestsMade++;
    };
    makeNextBatchRequest();
}
//# sourceMappingURL=mutateInternal.js.map