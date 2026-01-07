import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './user.model';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';

@Module({
  imports: [
    SequelizeModule.forFeature([User]), // 👈 registers the model
  ],
  providers: [UserService, UserResolver],
  exports: [UserService], // 👈 auth module will need this
})
export class UserModule {}
