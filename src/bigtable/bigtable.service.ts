import { Injectable, OnModuleInit } from '@nestjs/common';
import { Bigtable, Table } from '@google-cloud/bigtable';
import { buildTweetRowKey } from './bigtable.util';
import { BigtableTweet } from './bigtable.types';

@Injectable()
export class BigtableService implements OnModuleInit {
  private bigtable!: Bigtable;
  private table!: Table;

  async onModuleInit() {
    const projectId = process.env.GCP_PROJECT_ID;
    const instanceId = process.env.BIGTABLE_INSTANCE_ID;

    if (!projectId || !instanceId) {
      throw new Error(
        'Bigtable is not configured. Set GCP_PROJECT_ID and BIGTABLE_INSTANCE_ID.',
      );
    }

    console.log('[Bigtable] Initializing client…');

    this.bigtable = new Bigtable({ projectId });

    const instance = this.bigtable.instance(instanceId);
    this.table = instance.table('tweets');

    // 🔎 Light connectivity check (no admin calls)
    await this.table.exists();

    console.log('[Bigtable] Connected and ready');
  }

  async writeTweet(tweet: {
    tweetId: string;
    userId: string;
    tweetContent: string;
    createdAt: Date;
  }): Promise<void> {
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

  async readTweetsByUserId(
    userId: string,
    limit = 50,
  ): Promise<BigtableTweet[]> {
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
      .filter((r): r is BigtableTweet => r !== null);
  }
}
