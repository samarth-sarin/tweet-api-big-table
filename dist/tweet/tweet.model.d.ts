import { Model, Sequelize, InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize';
import { User } from '../user/user.model';
export declare class Tweet extends Model<InferAttributes<Tweet>, InferCreationAttributes<Tweet>> {
    tweetId: CreationOptional<string>;
    userId: string;
    tweetContent: string;
    createdAt: CreationOptional<Date>;
    updatedAt: CreationOptional<Date>;
    user?: User;
}
export declare function initTweetModel(sequelize: Sequelize): void;
