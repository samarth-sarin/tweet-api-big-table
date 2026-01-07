import { Model, Sequelize, InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize';
export declare class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
    id: CreationOptional<string>;
    email: string;
    passwordHash: string;
    firstName: string;
    lastName: string;
    createdAt: CreationOptional<Date>;
    updatedAt: CreationOptional<Date>;
}
export declare function initUserModel(sequelize: Sequelize): void;
