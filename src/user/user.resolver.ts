import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.model';
import { GqlAuthGuard } from '../auth/gql-auth.guard';
import { CurrentUser } from '../auth/current-user.decorator';


@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => [User])
  users() {
    return this.userService.findAll();
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => User)
  me(@CurrentUser() user: User) {
    return user;
  }

  @Mutation(() => User)
  createUser(
    @Args('email') email: string,
    @Args('password') password: string,
    @Args('firstName') firstName: string,
    @Args('lastName') lastName: string,
  ) {
    console.log("Creating user!");
    return this.userService.createUser({
      email,
      password,
      firstName,
      lastName,
    });
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => User)
  updateFirstName(
    @CurrentUser() user: User,
    @Args('firstName') firstName: string,
  ) {
    console.log("Updating first name of user.");
    return this.userService.updateFirstName(user.id, firstName);
  }


  @UseGuards(GqlAuthGuard)
  @Mutation(() => User)
  updateNames(
    @CurrentUser() user: User,
    @Args('firstName') firstName: string,
    @Args('lastName') lastName: string,
  ) {
    console.log("Updating first name and last name of a user");
    return this.userService.updateNames(user.id, firstName, lastName);
  }
}
