import { OnModuleInit } from '@nestjs/common';
import { BigtableTweet } from './bigtable.types';
export declare class BigtableService implements OnModuleInit {
    private bigtable;
    private table;
    onModuleInit(): Promise<void>;
    writeTweet(tweet: {
        tweetId: string;
        userId: string;
        tweetContent: string;
        createdAt: Date;
    }): Promise<void>;
    readTweetsByUserId(userId: string, limit?: number): Promise<BigtableTweet[]>;
}
