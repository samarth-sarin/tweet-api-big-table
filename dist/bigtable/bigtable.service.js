"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BigtableService = void 0;
const common_1 = require("@nestjs/common");
const bigtable_1 = require("@google-cloud/bigtable");
const bigtable_util_1 = require("./bigtable.util");
let BigtableService = class BigtableService {
    bigtable;
    table;
    async onModuleInit() {
        this.bigtable = new bigtable_1.Bigtable({
            projectId: process.env.BIGTABLE_PROJECT_ID,
        });
        console.log('Bigtable client initialized');
        const instance = this.bigtable.instance(process.env.BIGTABLE_INSTANCE_ID);
        this.table = instance.table('tweets');
        const [exists] = await this.table.exists();
        if (!exists) {
            await this.table.create({
                families: [{ name: 't' }],
            });
            console.log('Bigtable table "tweets" created');
        }
        console.log('Bigtable ready');
    }
    async writeTweet(tweet) {
        const rowKey = (0, bigtable_util_1.buildTweetRowKey)(tweet.userId, tweet.createdAt, tweet.tweetId);
        await this.table.insert({
            key: rowKey,
            data: {
                t: {
                    user_id: tweet.userId,
                    content: tweet.tweetContent,
                    created_at: tweet.createdAt.toISOString(),
                },
            },
        });
    }
    async readTweetsByUserId(userId, limit = 50) {
        const prefix = `${userId}#`;
        const [result] = await this.table.getRows({
            prefix,
            limit,
        });
        const rows = [];
        for (const row of result) {
            const data = row.data.t;
            const [, , tweetId] = row.id.split('#');
            rows.push({
                tweetId,
                userId: data.user_id[0].value.toString(),
                tweetContent: data.content[0].value.toString(),
                createdAt: new Date(data.created_at[0].value.toString()),
            });
        }
        return rows;
    }
};
exports.BigtableService = BigtableService;
exports.BigtableService = BigtableService = __decorate([
    (0, common_1.Injectable)()
], BigtableService);
//# sourceMappingURL=bigtable.service.js.map