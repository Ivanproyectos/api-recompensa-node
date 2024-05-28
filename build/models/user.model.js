"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const recompensadb_1 = require("../database/recompensadb");
const sequelize_1 = require("sequelize");
exports.User = recompensadb_1.sequelize.define('users', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true
    },
    correo: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    nombre: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    apellidos: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    }
});
