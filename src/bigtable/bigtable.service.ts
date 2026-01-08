import { Injectable, OnModuleInit } from '@nestjs/common';
import { Bigtable, Table } from '@google-cloud/bigtable';
import { buildTweetRowKey } from './bigtable.util';
import { BigtableTweet } from './bigtable.types';

@Injectable()
export class BigtableService {
  private bigtable!: Bigtable;
  private table!: Table;
  private initialized = false;

  async initIfNeeded() {
    if (this.initialized) return;

    if (!process.env.BIGTABLE_INSTANCE_ID) {
      console.warn('Bigtable not configured, skipping');
      return;
    }

    this.bigtable = new Bigtable({
      projectId: process.env.GCP_PROJECT_ID,
    });

    const instance = this.bigtable.instance(
      process.env.BIGTABLE_INSTANCE_ID,
    );

    this.table = instance.table('tweets');
    this.initialized = true;

    console.log('Bigtable initialized');
  }

  async writeTweet(tweet: {
    tweetId: string;
    userId: string;
    tweetContent: string;
    createdAt: Date;
  }) {
    await this.initIfNeeded();
    if (!this.table) return [];
    
    const rowKey = buildTweetRowKey(
      tweet.userId,
      tweet.createdAt,
      tweet.tweetId
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

  async readTweetsByUserId(userId: string, limit = 50) {
        await this.initIfNeeded();
        if (!this.table) return [];

        const prefix = `${userId}#`;

        const [result] = await this.table.getRows({
            prefix,
            limit,
        });
        
        const rows: BigtableTweet[] = [];

        for (const row of result) {
            const data = row.data.t;
            const [, , tweetId] = row.id.split('#');

            rows.push({
                tweetId,
                userId: data.user_id[0].value.toString(),
                tweetContent: data.content[0].value.toString(),
                createdAt: new Date(data.created_at[0].value.toString()),
            });
        }

        return rows;
  }

}
