import { Module, Scope } from '@nestjs/common';
import { UserModule } from '../user/user.module'; // 👈 ADD THIS
import { UserService } from '../user/user.service';
import { createUserLoader } from './user.loader';

@Module({
  imports: [UserModule],
  providers: [
    {
      provide: 'USER_LOADER',
      scope: Scope.REQUEST,
      inject: [UserService],
      useFactory: (userService: UserService) =>
        createUserLoader(userService),
    },
  ],
  exports: ['USER_LOADER'],
})
export class LoaderModule {}
