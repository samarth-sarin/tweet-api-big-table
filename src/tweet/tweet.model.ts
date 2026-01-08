import {
  Model,
  DataTypes,
  Sequelize,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional
} from 'sequelize';
import { User } from '../user/user.model';

export class Tweet extends Model<
  InferAttributes<Tweet>,
  InferCreationAttributes<Tweet>
> {
  declare tweetId: CreationOptional<string>;
  declare userId: string;
  declare tweetContent: string;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
  declare user?: User;
}

export function initTweetModel(sequelize: Sequelize) {
  Tweet.init(
    {
      tweetId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        unique: true,
      },
      userId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
      },
      tweetContent: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      sequelize,
      tableName: 'tweets',
      timestamps: true,
      underscored: true,
    },
  );
}
