"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoaderModule = void 0;
const common_1 = require("@nestjs/common");
const user_module_1 = require("../user/user.module");
const user_service_1 = require("../user/user.service");
const user_loader_1 = require("./user.loader");
let LoaderModule = class LoaderModule {
};
exports.LoaderModule = LoaderModule;
exports.LoaderModule = LoaderModule = __decorate([
    (0, common_1.Module)({
        imports: [user_module_1.UserModule],
        providers: [
            {
                provide: 'USER_LOADER',
                scope: common_1.Scope.REQUEST,
                inject: [user_service_1.UserService],
                useFactory: (userService) => (0, user_loader_1.createUserLoader)(userService),
            },
        ],
        exports: ['USER_LOADER'],
    })
], LoaderModule);
//# sourceMappingURL=loader.module.js.map