import { OnModuleInit } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
export declare class SequelizeDebugService implements OnModuleInit {
    private readonly sequelize;
    constructor(sequelize: Sequelize);
    onModuleInit(): Promise<void>;
}
