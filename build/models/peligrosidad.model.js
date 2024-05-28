"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NivelPeligro = void 0;
const recompensadb_1 = require("../database/recompensadb");
const sequelize_1 = require("sequelize");
exports.NivelPeligro = recompensadb_1.sequelize.define('nivel_peligros', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true
    },
    nombre: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    }
});
