import { Injectable, OnModuleInit } from '@nestjs/common';
import { Bigtable, Table } from '@google-cloud/bigtable';
import { buildTweetRowKey } from './bigtable.util';
import { BigtableTweet } from './bigtable.types';

@Injectable()
export class BigtableService implements OnModuleInit {
  private bigtable!: Bigtable;
  private table!: Table;
  

  async onModuleInit() {
    this.bigtable = new Bigtable({
      projectId: process.env.BIGTABLE_PROJECT_ID,
    });

    console.log('Bigtable client initialized');

    const instance = this.bigtable.instance(
      process.env.BIGTABLE_INSTANCE_ID!,
    );

    this.table = instance.table('tweets');

    const [exists] = await this.table.exists();
    if (!exists) {
      await this.table.create({
        families: [{ name: 't' }],
      });
      console.log('Bigtable table "tweets" created');
    }

    console.log('Bigtable ready');
  }

  async writeTweet(tweet: {
    tweetId: string;
    userId: string;
    tweetContent: string;
    createdAt: Date;
  }) {
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
