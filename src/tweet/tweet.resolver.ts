import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { UseGuards, Inject } from '@nestjs/common';
import DataLoader from 'dataloader';

import { TweetService } from './tweet.service';
import { BigtableService } from '../bigtable/bigtable.service';
import { Tweet } from './tweet.model';
import { User } from '../user/user.model';
import { UserService } from '../user/user.service';
import { GqlAuthGuard } from '../auth/gql-auth.guard';
import { CurrentUser } from '../auth/current-user.decorator';

@Resolver(() => Tweet)
export class TweetResolver {
  constructor(
    private readonly tweetService: TweetService,
    private readonly userService: UserService,
    private readonly bigtableService: BigtableService,
    @Inject('USER_LOADER')
    private readonly userLoader: DataLoader<string, User>,
  ) {}

  // --------------------
  // Mutations
  // --------------------

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Tweet)
  createTweet(
    @CurrentUser() user: User,
    @Args('tweetContent') tweetContent: string,
  ) {
    console.log('[TweetResolver] Creating tweet');
    return this.tweetService.createTweet(tweetContent, user.id);
  }

  // --------------------
  // Queries (SQL-backed)
  // --------------------

  @Query(() => [Tweet])
  listTweetsByUserId(@Args('userId') userId: string) {
    return this.tweetService.findByUserId(userId);
  }

  @Query(() => [Tweet])
  listTweets() {
    return this.tweetService.findAll();
  }

  // --------------------
  // Query (Bigtable point lookup)
  // --------------------

  @Query(() => Tweet, { nullable: true })
  async findTweet(@Args('tweetId') tweetId: string) {
    const row = await this.bigtableService.readTweetById(tweetId);

    if (!row) return null;

    return {
      tweetId: row.tweetId,
      userId: row.userId,
      tweetContent: row.tweetContent,
      createdAt: row.createdAt,
    };
  }

  // --------------------
  // Field resolvers
  // --------------------

  @ResolveField(() => User)
  user(@Parent() tweet: Tweet) {
    return this.userLoader.load(tweet.userId);
  }

  // --------------------
  // Bigtable scan (disabled)
  // --------------------

  @Query(() => [String])
  async tweetIdsByUserId(
    @Args('userId') userId: string,
  ) {
    return this.bigtableService.readTweetIdsByUserId(userId);
  }
}
