import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { UserModule } from './user/user.module';
import { DatabaseModule } from './database/database.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { TweetModule } from './tweet/tweet.module';
import { LoaderModule } from './loaders/loader.module';
import { RedisModule } from './redis/redis.module';
import { BigtableModule } from './bigtable/bigtable.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: false,
      typePaths: ['./src/**/*.graphql'],
      playground: true,
      csrfPrevention: false, // 👈 optional (explained below)
    }),
    BigtableModule,
    RedisModule,
    LoaderModule,
    UserModule,
    DatabaseModule,
    AuthModule,
    TweetModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}