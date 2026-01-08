import { Resolver, Query, Mutation, Args, ResolveField, Parent } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { Inject } from '@nestjs/common';
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


  @UseGuards(GqlAuthGuard)
  @Mutation(() => Tweet)
  createTweet(
    @CurrentUser() user: User,
    @Args('tweetContent') tweetContent: string) {
    console.log("[TweetResolver] Creating tweet.");
    return this.tweetService.createTweet(tweetContent, user.id);
  }

  @Query(() => [Tweet])
  listTweetsByUserId(@Args('userId') userId: string) {
    return this.tweetService.findByUserId(userId);
  }

  @Query(() => [Tweet])
  listTweets() {
    return this.tweetService.findAll();
  }

  @ResolveField(() => User)
  user(@Parent() tweet: Tweet) {
    return this.userLoader.load(tweet.userId);
  }

  @Query(() => [Tweet])
  async listTweetsBigTable(@Args('userId') userId: string) {
    const rows =
      await this.bigtableService.readTweetsByUserId(userId);

    // Map Bigtable rows → GraphQL Tweet type
    return rows.map(r => ({
      tweetId: r.tweetId,
      userId: r.userId,
      tweetContent: r.tweetContent,
      createdAt: r.createdAt,
    }));
  }
}
