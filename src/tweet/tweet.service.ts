import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Tweet } from './tweet.model';
import { BigtableService } from '../bigtable/bigtable.service';


@Injectable()
export class TweetService {
  constructor(
    @InjectModel(Tweet)
    private readonly tweetModel: typeof Tweet,
    private bigtableService: BigtableService,
  ) {}

  async createTweet(tweetContent: string, userId: string) {
    const tweet = await this.tweetModel.create({
      userId,
      tweetContent,
    });

    // fire-and-forget Bigtable write
    this.bigtableService
      .writeTweet({
        tweetId: tweet.tweetId,
        userId: tweet.userId,
        tweetContent: tweet.tweetContent,
        createdAt: tweet.createdAt,
      })
      .catch(err =>
        console.error('Bigtable write failed', err),
      );

    return tweet;
  }

  async findByUserId(userId: string) {
    return this.tweetModel.findAll({
      where: { userId },
      order: [['createdAt', 'DESC']],
    })
  }

  async findAll(): Promise<Tweet[]> {
    console.log('[TweetService] findAll() method called');
    return Tweet.findAll();
  }
}