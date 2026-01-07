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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TweetResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const common_1 = require("@nestjs/common");
const common_2 = require("@nestjs/common");
const dataloader_1 = __importDefault(require("dataloader"));
const tweet_service_1 = require("./tweet.service");
const tweet_model_1 = require("./tweet.model");
const user_model_1 = require("../user/user.model");
const user_service_1 = require("../user/user.service");
const gql_auth_guard_1 = require("../auth/gql-auth.guard");
const current_user_decorator_1 = require("../auth/current-user.decorator");
let TweetResolver = class TweetResolver {
    tweetService;
    userService;
    userLoader;
    constructor(tweetService, userService, userLoader) {
        this.tweetService = tweetService;
        this.userService = userService;
        this.userLoader = userLoader;
    }
    createTweet(user, tweetContent) {
        console.log("[TweetResolver] Creating tweet.");
        return this.tweetService.createTweet(tweetContent, user.id);
    }
    listTweetsByUserId(userId) {
        return this.tweetService.findByUserId(userId);
    }
    listTweets() {
        return this.tweetService.findAll();
    }
    user(tweet) {
        return this.userLoader.load(tweet.userId);
    }
};
exports.TweetResolver = TweetResolver;
__decorate([
    (0, common_1.UseGuards)(gql_auth_guard_1.GqlAuthGuard),
    (0, graphql_1.Mutation)(() => tweet_model_1.Tweet),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, graphql_1.Args)('tweetContent')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_model_1.User, String]),
    __metadata("design:returntype", void 0)
], TweetResolver.prototype, "createTweet", null);
__decorate([
    (0, graphql_1.Query)(() => [tweet_model_1.Tweet]),
    __param(0, (0, graphql_1.Args)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TweetResolver.prototype, "listTweetsByUserId", null);
__decorate([
    (0, graphql_1.Query)(() => [tweet_model_1.Tweet]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TweetResolver.prototype, "listTweets", null);
__decorate([
    (0, graphql_1.ResolveField)(() => user_model_1.User),
    __param(0, (0, graphql_1.Parent)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [tweet_model_1.Tweet]),
    __metadata("design:returntype", void 0)
], TweetResolver.prototype, "user", null);
exports.TweetResolver = TweetResolver = __decorate([
    (0, graphql_1.Resolver)(() => tweet_model_1.Tweet),
    __param(2, (0, common_2.Inject)('USER_LOADER')),
    __metadata("design:paramtypes", [tweet_service_1.TweetService,
        user_service_1.UserService,
        dataloader_1.default])
], TweetResolver);
//# sourceMappingURL=tweet.resolver.js.map