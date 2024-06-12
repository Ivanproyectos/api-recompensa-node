"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoriaModel = void 0;
const recompensadb_1 = require("../database/recompensadb");
const sequelize_1 = require("sequelize");
exports.CategoriaModel = recompensadb_1.sequelize.define('categoria_delitos', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true
    },
    nombre: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    }
}, { timestamps: false });
