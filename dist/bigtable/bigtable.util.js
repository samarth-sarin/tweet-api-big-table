"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildTweetRowKey = buildTweetRowKey;
function buildTweetRowKey(userId, createdAt, tweetId) {
    const reverseTimestamp = BigInt('9223372036854775807') - BigInt(createdAt.getTime());
    return `${userId}#${reverseTimestamp}#${tweetId}`;
}
//# sourceMappingURL=bigtable.util.js.map