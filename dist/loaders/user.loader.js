"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUserLoader = createUserLoader;
const dataloader_1 = __importDefault(require("dataloader"));
function createUserLoader(userService) {
    return new dataloader_1.default(async (userIds) => {
        console.log('Batch loading users:', userIds);
        const users = await userService.findByIds(userIds);
        const userMap = new Map(users.map(user => [user.id, user]));
        return userIds.map(id => userMap.get(id) ?? null);
    });
}
//# sourceMappingURL=user.loader.js.map