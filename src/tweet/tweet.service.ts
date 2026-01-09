import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Tweet } from './tweet.model';
import { BigtableService } from '../bigtable/bigtable.service';
import { randomUUID } from 'crypto';


@Injectable()
export class TweetService {
  constructor(
    @InjectModel(Tweet)
    private readonly tweetModel: typeof Tweet,
    private bigtableService: BigtableService,
  ) {}

async createTweet(tweetContent: string, userId: string) {
    const tweetId = randomUUID();
    const createdAt = new Date();

    const tweet = {
      tweetId,
      userId,
      tweetContent,
      createdAt,
    };

    await this.bigtableService.writeTweet(tweet);

    return tweet;
}

  async findByUserId(userId: string) {
    return await this.bigtableService.readTweetsByUserId(userId);
  }

  async findAll(): Promise<Tweet[]> {
    console.log('[TweetService] findAll() method called');
    return Tweet.findAll();
  }
}