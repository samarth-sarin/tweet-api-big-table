"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tweet = void 0;
exports.initTweetModel = initTweetModel;
const sequelize_1 = require("sequelize");
class Tweet extends sequelize_1.Model {
}
exports.Tweet = Tweet;
function initTweetModel(sequelize) {
    Tweet.init({
        tweetId: {
            type: sequelize_1.DataTypes.UUID,
            defaultValue: sequelize_1.DataTypes.UUIDV4,
            primaryKey: true,
            unique: true,
        },
        userId: {
            type: sequelize_1.DataTypes.UUID,
            defaultValue: sequelize_1.DataTypes.UUIDV4,
            allowNull: false,
            references: {
                model: 'users',
                key: 'id',
            },
        },
        tweetContent: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        createdAt: sequelize_1.DataTypes.DATE,
        updatedAt: sequelize_1.DataTypes.DATE,
    }, {
        sequelize,
        tableName: 'tweets',
        timestamps: true,
    });
}
//# sourceMappingURL=tweet.model.js.map