"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TweetModule = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const tweet_model_1 = require("./tweet.model");
const tweet_service_1 = require("./tweet.service");
const tweet_resolver_1 = require("./tweet.resolver");
const user_module_1 = require("../user/user.module");
const loader_module_1 = require("../loaders/loader.module");
const bigtable_module_1 = require("../bigtable/bigtable.module");
let TweetModule = class TweetModule {
};
exports.TweetModule = TweetModule;
exports.TweetModule = TweetModule = __decorate([
    (0, common_1.Module)({
        imports: [
            sequelize_1.SequelizeModule.forFeature([tweet_model_1.Tweet]),
            user_module_1.UserModule,
            loader_module_1.LoaderModule,
            bigtable_module_1.BigtableModule
        ],
        providers: [tweet_service_1.TweetService, tweet_resolver_1.TweetResolver,],
        exports: [tweet_service_1.TweetService],
    })
], TweetModule);
//# sourceMappingURL=tweet.module.js.map