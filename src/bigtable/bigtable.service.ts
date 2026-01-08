import { Injectable } from '@nestjs/common';
import { Bigtable, Table } from '@google-cloud/bigtable';
import { buildTweetRowKey } from './bigtable.util';
import { BigtableTweet } from './bigtable.types';

@Injectable()
export class BigtableService {
  private bigtable?: Bigtable;
  private table?: Table;
  private initialized = false;

  /**
   * Lazily initialize Bigtable.
   * Safe for Cloud Run (no work at cold start).
   */
  private async initIfNeeded(): Promise<void> {
    if (this.initialized) return;

    const projectId = process.env.GCP_PROJECT_ID;
    const instanceId = process.env.BIGTABLE_INSTANCE_ID;

    if (!projectId || !instanceId) {
      console.warn('[Bigtable] Not configured, skipping initialization');
      return;
    }

    this.bigtable = new Bigtable({ projectId });

    const instance = this.bigtable.instance(instanceId);
    this.table = instance.table('tweets');

    this.initialized = true;
    console.log('[Bigtable] Initialized');
  }

  /**
   * Write a tweet row (fire-and-forget friendly, but awaitable).
   */
  async writeTweet(tweet: {
    tweetId: string;
    userId: string;
    tweetContent: string;
    createdAt: Date;
  }): Promise<void> {
    await this.initIfNeeded();
    if (!this.table) return;

    const rowKey = buildTweetRowKey(
      tweet.userId,
      tweet.createdAt,
      tweet.tweetId,
    );

    await this.table.insert({
      key: rowKey,
      data: {
        t: {
          user_id: tweet.userId,
          content: tweet.tweetContent,
          created_at: tweet.createdAt.toISOString(),
        },
      },
    });
  }

  /**
   * Read tweets for a user (ordered by reverse timestamp via row key).
   */
  async readTweetsByUserId(
    userId: string,
    limit = 50,
  ): Promise<BigtableTweet[]> {
    await this.initIfNeeded();
    if (!this.table) return [];

    const prefix = `${userId}#`;

    const [rows] = await this.table.getRows({
      prefix,
      limit,
    });

    return rows
      .map(row => {
        const data = row.data?.t;
        if (!data) return null;

        const [, , tweetId] = row.id.split('#');

        return {
          tweetId,
          userId: data.user_id?.[0]?.value?.toString() ?? '',
          tweetContent: data.content?.[0]?.value?.toString() ?? '',
          createdAt: new Date(
            data.created_at?.[0]?.value?.toString() ?? 0,
          ),
        };
      })
      .filter((row): row is BigtableTweet => row !== null);
  }
}