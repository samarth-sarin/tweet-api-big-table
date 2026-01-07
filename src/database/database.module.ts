import { Module, OnModuleInit } from '@nestjs/common';
import { SequelizeModule, InjectConnection } from '@nestjs/sequelize';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Sequelize } from 'sequelize';
import { User, initUserModel } from '../user/user.model';
import { Tweet, initTweetModel } from 'src/tweet/tweet.model';

@Module({
  imports: [
    ConfigModule,
    SequelizeModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        dialect: 'postgres',
        host: config.get('DB_HOST'),
        port: Number(config.get('DB_PORT')),
        database: config.get('DB_NAME'),
        username: config.get('DB_USER'),
        password: config.get('DB_PASSWORD'),
        logging: console.log,
      }),
    }),
  ],
})
export class DatabaseModule implements OnModuleInit {
  constructor(
    @InjectConnection()
    private readonly sequelize: Sequelize,
  ) {}

  async onModuleInit() {
    console.log('Initializing models manually (no decorators)');
    initUserModel(this.sequelize);
    initTweetModel(this.sequelize);
    Tweet.belongsTo(User, { foreignKey: 'userId', as: 'user'});
    User.hasMany(Tweet, { foreignKey: 'userId', as: 'tweets'});

    console.log('Syncing database...');
    if (process.env.NODE_ENV !== 'production') {
      await this.sequelize.sync({ alter: true });
    }
  }
}
