"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const user_model_1 = require("./user.model");
const redis_service_1 = require("../redis/redis.service");
const password_util_1 = require("../auth/password.util");
const bcrypt = __importStar(require("bcrypt"));
let UserService = class UserService {
    userModel;
    redisService;
    constructor(userModel, redisService) {
        this.userModel = userModel;
        this.redisService = redisService;
    }
    async createUser(data) {
        const passwordHash = await (0, password_util_1.hashPassword)(data.password);
        return user_model_1.User.create({
            email: data.email,
            passwordHash,
            firstName: data.firstName,
            lastName: data.lastName,
        });
    }
    async updateFirstName(userId, firstName) {
        const user = await this.findById(userId);
        if (!user) {
            throw new Error('User doesnt exist');
        }
        user.firstName = firstName;
        await user.save();
        return user;
    }
    async login(email, password) {
        const user = await this.userModel.findOne({ where: { email } });
        if (!user) {
            throw new Error('Invalid credentials');
        }
        const valid = await bcrypt.compare(password, user.passwordHash);
        if (!valid) {
            throw new Error('Invalid credentials');
        }
        return user;
    }
    async findAll() {
        console.log('[UserService] findAll() method called');
        return user_model_1.User.findAll();
    }
    async findByEmail(email) {
        return this.userModel.findOne({ where: { email } });
    }
    async findById(id) {
        const redis = this.redisService.getClient();
        const catcheKey = `user:${id}`;
        const cached = await redis.get(catcheKey);
        if (cached) {
            return JSON.parse(cached);
        }
        const user = await user_model_1.User.findByPk(id);
        if (!user)
            return null;
        await redis.set(catcheKey, JSON.stringify(user), 'EX', 60 * 60);
        return user;
    }
    async findByIds(ids) {
        const timestampStartInMilliseconds = Date.now();
        const redis = this.redisService.getClient();
        const prefix = 'user:';
        const keys = ids.map(id => `${prefix}${id}`);
        const cachedValues = await redis.mget(keys);
        const cachedUsers = new Map();
        const missingIds = [];
        cachedValues.forEach((value, index) => {
            const id = ids[index];
            if (value) {
                cachedUsers.set(id, JSON.parse(value));
            }
            else {
                missingIds.push(id);
            }
        });
        let dbUsers = [];
        if (missingIds.length > 0) {
            console.log("Cache Miss");
            dbUsers = await this.userModel.findAll({
                where: { id: missingIds },
            });
            const pipeline = redis.pipeline();
            for (const user of dbUsers) {
                pipeline.set(`${prefix}${user.id}`, JSON.stringify(user), 'EX', 60 * 60);
                cachedUsers.set(user.id, user);
            }
            await pipeline.exec();
        }
        else {
            console.log("Complete Cache Hit");
        }
        const timestampEndInMilliseconds = Date.now();
        console.log(`findByIds took ${timestampEndInMilliseconds - timestampStartInMilliseconds}`);
        return ids.map(id => cachedUsers.get(id) ?? null);
    }
    async updateNames(id, firstName, lastName) {
        const user = await this.findById(id);
        if (!user) {
            throw new Error('User not found');
        }
        user.firstName = firstName;
        user.lastName = lastName;
        return user.save();
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(user_model_1.User)),
    __metadata("design:paramtypes", [Object, redis_service_1.RedisService])
], UserService);
//# sourceMappingURL=user.service.js.map