import { Tweet } from './tweet.model';
export declare class TweetService {
    private readonly tweetModel;
    constructor(tweetModel: typeof Tweet);
    createTweet(tweetContent: string, userId: string): Promise<Tweet>;
    findByUserId(userId: string): Promise<Tweet[]>;
    findAll(): Promise<Tweet[]>;
}
