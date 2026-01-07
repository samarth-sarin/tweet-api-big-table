import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Tweet } from './tweet.model';
import { TweetService } from './tweet.service';
import { TweetResolver } from './tweet.resolver';
import { UserModule } from 'src/user/user.module';
import { LoaderModule } from 'src/loaders/loader.module'; // 👈 ADD THIS

@Module({
  imports: [
    SequelizeModule.forFeature([Tweet]), // 👈 registers the model
    UserModule,
    LoaderModule
  ],
  providers: [TweetService, TweetResolver, ],
  exports: [TweetService], // 👈 auth module will need this
})
export class TweetModule {}
