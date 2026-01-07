"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
exports.initUserModel = initUserModel;
const sequelize_1 = require("sequelize");
class User extends sequelize_1.Model {
}
exports.User = User;
function initUserModel(sequelize) {
    User.init({
        id: {
            type: sequelize_1.DataTypes.UUID,
            defaultValue: sequelize_1.DataTypes.UUIDV4,
            primaryKey: true,
        },
        email: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        passwordHash: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        firstName: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        lastName: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        createdAt: sequelize_1.DataTypes.DATE,
        updatedAt: sequelize_1.DataTypes.DATE,
    }, {
        sequelize,
        tableName: 'users',
        timestamps: true,
    });
}
//# sourceMappingURL=user.model.js.map