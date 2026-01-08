import { Tweet } from './tweet.model';
import { BigtableService } from '../bigtable/bigtable.service';
export declare class TweetService {
    private readonly tweetModel;
    private bigtableService;
    constructor(tweetModel: typeof Tweet, bigtableService: BigtableService);
    createTweet(tweetContent: string, userId: string): Promise<Tweet>;
    findByUserId(userId: string): Promise<Tweet[]>;
    findAll(): Promise<Tweet[]>;
}
