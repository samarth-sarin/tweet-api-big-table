import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Tweet } from './tweet.model';
import { User } from '../user/user.model';
import { UserService } from '../user/user.service';

@Injectable()
export class TweetService {
  constructor(
    @InjectModel(Tweet)
    private readonly tweetModel: typeof Tweet,
  ) {}

  async createTweet(tweetContent: string, userId: string) {
    return Tweet.create({
      tweetContent: tweetContent,
      userId: userId
    });
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