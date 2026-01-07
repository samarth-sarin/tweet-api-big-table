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
exports.UserResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const common_1 = require("@nestjs/common");
const user_service_1 = require("./user.service");
const user_model_1 = require("./user.model");
const gql_auth_guard_1 = require("../auth/gql-auth.guard");
const current_user_decorator_1 = require("../auth/current-user.decorator");
let UserResolver = class UserResolver {
    userService;
    constructor(userService) {
        this.userService = userService;
    }
    users() {
        return this.userService.findAll();
    }
    me(user) {
        return user;
    }
    createUser(email, password, firstName, lastName) {
        console.log("Creating user!");
        return this.userService.createUser({
            email,
            password,
            firstName,
            lastName,
        });
    }
    updateFirstName(user, firstName) {
        console.log("Updating first name of user.");
        return this.userService.updateFirstName(user.id, firstName);
    }
    updateNames(user, firstName, lastName) {
        console.log("Updating first name and last name of a user");
        return this.userService.updateNames(user.id, firstName, lastName);
    }
};
exports.UserResolver = UserResolver;
__decorate([
    (0, graphql_1.Query)(() => [user_model_1.User]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UserResolver.prototype, "users", null);
__decorate([
    (0, common_1.UseGuards)(gql_auth_guard_1.GqlAuthGuard),
    (0, graphql_1.Query)(() => user_model_1.User),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_model_1.User]),
    __metadata("design:returntype", void 0)
], UserResolver.prototype, "me", null);
__decorate([
    (0, graphql_1.Mutation)(() => user_model_1.User),
    __param(0, (0, graphql_1.Args)('email')),
    __param(1, (0, graphql_1.Args)('password')),
    __param(2, (0, graphql_1.Args)('firstName')),
    __param(3, (0, graphql_1.Args)('lastName')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String]),
    __metadata("design:returntype", void 0)
], UserResolver.prototype, "createUser", null);
__decorate([
    (0, common_1.UseGuards)(gql_auth_guard_1.GqlAuthGuard),
    (0, graphql_1.Mutation)(() => user_model_1.User),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, graphql_1.Args)('firstName')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_model_1.User, String]),
    __metadata("design:returntype", void 0)
], UserResolver.prototype, "updateFirstName", null);
__decorate([
    (0, common_1.UseGuards)(gql_auth_guard_1.GqlAuthGuard),
    (0, graphql_1.Mutation)(() => user_model_1.User),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, graphql_1.Args)('firstName')),
    __param(2, (0, graphql_1.Args)('lastName')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_model_1.User, String, String]),
    __metadata("design:returntype", void 0)
], UserResolver.prototype, "updateNames", null);
exports.UserResolver = UserResolver = __decorate([
    (0, graphql_1.Resolver)(() => user_model_1.User),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserResolver);
//# sourceMappingURL=user.resolver.js.map