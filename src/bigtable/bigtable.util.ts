import crypto from 'crypto';

export function buildTweetRowKey(
  userId: string,
  createdAt: Date,
  tweetId: string,
) {
  const reverseTimestamp =
    BigInt('9223372036854775807') - BigInt(createdAt.getTime());

  return `${userId}#${reverseTimestamp}#${tweetId}`;
}