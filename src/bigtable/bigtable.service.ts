import { Injectable, OnModuleInit } from '@nestjs/common';
import { Bigtable, Table } from '@google-cloud/bigtable';
import { buildTweetRowKey } from './bigtable.util';
import { BigtableTweet } from './bigtable.types';

@Injectable()
export class BigtableService implements OnModuleInit {
  private bigtable!: Bigtable;
  private tweetTable!: Table;
  private userIdViewTable!: Table;

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
    this.tweetTable = instance.table('tweets');
    this.userIdViewTable = instance.table('user_id_view');

    // 🔎 Light connectivity check (no admin calls)
    await this.tweetTable.exists();

    console.log('[Bigtable] Connected and ready');
  }

  async writeTweet(tweet: {
    tweetId: string;
    userId: string;
    tweetContent: string;
    createdAt: Date;
  }): Promise<void> {
    await this.tweetTable.insert({
      key: tweet.tweetId,
      data: {
        t: {
          tweet_id: tweet.tweetId,
          user_id: tweet.userId,
          content: tweet.tweetContent,
          created_at: tweet.createdAt.toISOString(),
        },
      },
    });
  }

  async readTweetById(tweetId: string): Promise<BigtableTweet | null> {
    const [row] = await this.tweetTable.row(tweetId).get().catch(() => [null]);

    if (!row) return null;

    const data = row.data.t;

    return {
      tweetId,
      userId: data.user_id[0].value.toString(),
      tweetContent: data.content[0].value.toString(),
      createdAt: new Date(data.created_at[0].value.toString()),
    };
  }

  async readTweetIdsByUserId(
    userId: string,
    limit = 50,
  ): Promise<string[]> {
    const [rows] = await this.userIdViewTable.getRows({
      prefix: userId,
      limit,
    });

    return rows.map(row => {
      // Row key format:
      // userId#created_at#tweetId
      const parts = row.id.split('#');
      return parts[2];
    });
  }

}
