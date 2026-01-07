import { OnModuleInit } from '@nestjs/common';
import { Sequelize } from 'sequelize';
export declare class DatabaseModule implements OnModuleInit {
    private readonly sequelize;
    constructor(sequelize: Sequelize);
    onModuleInit(): Promise<void>;
}
