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
exports.TimedStream = void 0;
const stream_1 = require("stream");
const { hrtime } = require('node:process');
/**
 * StreamTimer is a utility class for measuring the elapsed time of stream
 * operations. It provides methods to start and stop the timer, as well as
 * retrieve the total duration in milliseconds.
 */
class StreamTimer {
    startTime;
    totalDuration;
    constructor() {
        this.startTime = 0n;
        this.totalDuration = 0n;
    }
    getTotalDurationMs() {
        return Number(this.totalDuration / 1000000n);
    }
    start() {
        this.startTime = hrtime.bigint();
    }
    stop() {
        const endTime = hrtime.bigint();
        const duration = endTime - this.startTime;
        this.totalDuration += duration;
    }
}
/**
 * The TimedStream class is used for measuring the time the user spends
 * processing data from the stream. We need to measure this time for use cases
 * like measuring the application latencies for client side metrics.
 */
class TimedStream extends stream_1.PassThrough {
    readTimer = new StreamTimer();
    transformTimer = new StreamTimer();
    constructor(options) {
        super({
            ...options,
            objectMode: true,
            readableHighWaterMark: 0, // We need to disable readside buffering to allow for acceptable behavior when the end user cancels the stream early.
            writableHighWaterMark: 0, // We need to disable writeside buffering because in nodejs 14 the call to _transform happens after write buffering. This creates problems for tracking the last seen row key.
            transform: (event, _encoding, callback) => {
                /* When we iterate through a stream, time spent waiting for the user's
                application is added to totalDurationTransform. When we use handlers,
                time spent waiting for the user's application is added to
                totalDurationTransform. We need two different timers to measure total
                application blocking latencies because the streams behave differently
                depending on whether the user is iterating through a stream or using
                timers.
                */
                this.transformTimer.start();
                if (options?.transformHook) {
                    options?.transformHook(event, _encoding, callback);
                }
                this.transformTimer.stop();
            },
        });
    }
    /**
     * read code is called when a row is consumed.
     */
    read(size) {
        // calculate the time spent between iterations of read (i.e. processing the stream in a for loop)
        const chunk = super.read(size);
        if (chunk) {
            this.readTimer.start();
            // Defer the after call to the next tick of the event loop
            process.nextTick(() => {
                this.readTimer.stop();
            });
        }
        return chunk;
    }
    /**
     * Returns the total amount of time the user code spends handling data.
     */
    getTotalDurationMs() {
        return (this.readTimer.getTotalDurationMs() +
            this.transformTimer.getTotalDurationMs());
    }
}
exports.TimedStream = TimedStream;
//# sourceMappingURL=timed-stream.js.map