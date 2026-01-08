"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
async function bootstrap() {
    console.log('DB_HOST:', process.env.DB_HOST);
    console.log('DB_NAME:', process.env.DB_NAME);
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    console.log('Starting server...');
    const port = process.env.PORT || 3000;
    console.log(`Listening on port ${port}`);
    await app.listen(port);
}
bootstrap();
//# sourceMappingURL=main.js.map