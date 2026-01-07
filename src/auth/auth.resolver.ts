import { Resolver, Mutation, Args, ObjectType, Field } from '@nestjs/graphql';
import { AuthService } from './auth.service';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation('login')
  async login(
    @Args('email') email: string,
    @Args('password') password: string,
  ) {
    console.log('[AuthResolver] login called', { email });

    const result = await this.authService.login(email, password);
    
    console.log('[AuthResolver] login result', result);

    return result;
  }
}
