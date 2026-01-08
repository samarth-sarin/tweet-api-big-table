import DataLoader from 'dataloader';
import { TweetService } from './tweet.service';
import { BigtableService } from '../bigtable/bigtable.service';
import { Tweet } from './tweet.model';
import { User } from '../user/user.model';
import { UserService } from '../user/user.service';
export declare class TweetResolver {
    private readonly tweetService;
    private readonly userService;
    private readonly bigtableService;
    private readonly userLoader;
    constructor(tweetService: TweetService, userService: UserService, bigtableService: BigtableService, userLoader: DataLoader<string, User>);
    createTweet(user: User, tweetContent: string): Promise<Tweet>;
    listTweetsByUserId(userId: string): Promise<Tweet[]>;
    listTweets(): Promise<Tweet[]>;
    user(tweet: Tweet): Promise<User>;
    listTweetsBigTable(userId: string): Promise<{
        tweetId: string;
        userId: string;
        tweetContent: string;
        createdAt: Date;
    }[]>;
}
