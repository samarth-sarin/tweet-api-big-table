import DataLoader from 'dataloader';
import { TweetService } from './tweet.service';
import { Tweet } from './tweet.model';
import { User } from '../user/user.model';
import { UserService } from '../user/user.service';
export declare class TweetResolver {
    private readonly tweetService;
    private readonly userService;
    private readonly userLoader;
    constructor(tweetService: TweetService, userService: UserService, userLoader: DataLoader<string, User>);
    createTweet(user: User, tweetContent: string): Promise<Tweet>;
    listTweetsByUserId(userId: string): Promise<Tweet[]>;
    listTweets(): Promise<Tweet[]>;
    user(tweet: Tweet): Promise<User>;
}
