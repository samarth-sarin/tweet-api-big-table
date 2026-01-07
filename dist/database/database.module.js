"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseModule = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const config_1 = require("@nestjs/config");
const sequelize_2 = require("sequelize");
const user_model_1 = require("../user/user.model");
const tweet_model_1 = require("../tweet/tweet.model");
let DatabaseModule = class DatabaseModule {
    sequelize;
    constructor(sequelize) {
        this.sequelize = sequelize;
    }
    async onModuleInit() {
        console.log('Initializing models manually (no decorators)');
        (0, user_model_1.initUserModel)(this.sequelize);
        (0, tweet_model_1.initTweetModel)(this.sequelize);
        tweet_model_1.Tweet.belongsTo(user_model_1.User, { foreignKey: 'userId', as: 'user' });
        user_model_1.User.hasMany(tweet_model_1.Tweet, { foreignKey: 'userId', as: 'tweets' });
        console.log('Syncing database...');
        await this.sequelize.sync({ alter: true });
    }
};
exports.DatabaseModule = DatabaseModule;
exports.DatabaseModule = DatabaseModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule,
            sequelize_1.SequelizeModule.forRootAsync({
                inject: [config_1.ConfigService],
                useFactory: (config) => ({
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
    }),
    __param(0, (0, sequelize_1.InjectConnection)()),
    __metadata("design:paramtypes", [sequelize_2.Sequelize])
], DatabaseModule);
//# sourceMappingURL=database.module.js.map