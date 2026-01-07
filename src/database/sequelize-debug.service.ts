import { Injectable, OnModuleInit } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';

@Injectable()
export class SequelizeDebugService implements OnModuleInit {
  constructor(private readonly sequelize: Sequelize) {}

  async onModuleInit() {
    console.log('--- Sequelize Debug Info ---');

    const models = this.sequelize.modelManager.models.map(
      (model) => model.name,
    );

    console.log('Registered Sequelize models:', models);

    const tables = await this.sequelize.getQueryInterface().showAllTables();
    console.log('Existing DB tables:', tables);

    console.log('----------------------------');
  }
}

