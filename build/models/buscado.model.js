"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BuscadoModel = void 0;
const recompensadb_1 = require("../database/recompensadb");
const sequelize_1 = require("sequelize");
const nivelPeligro_model_1 = require("./nivelPeligro.model");
const categoria_model_1 = require("./categoria.model");
exports.BuscadoModel = recompensadb_1.sequelize.define('buscado', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true
    },
    nombre: {
        type: sequelize_1.DataTypes.STRING
    },
    apellidos: {
        type: sequelize_1.DataTypes.STRING
    },
    alias: {
        type: sequelize_1.DataTypes.STRING
    },
    descripcion: {
        type: sequelize_1.DataTypes.STRING
    },
    recompensa: {
        type: sequelize_1.DataTypes.STRING
    },
    categoriaId: {
        type: sequelize_1.DataTypes.INTEGER
        // field: 'categoria_id' // Define el nombre en snake_case para la columna
    },
    tipoPeligroId: {
        type: sequelize_1.DataTypes.INTEGER,
        field: 'tipo_peligro_id' // Define el nombre en snake_case para la columna
    },
    image: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    }
});
nivelPeligro_model_1.NivelPeligroModel.hasMany(exports.BuscadoModel, {
    sourceKey: 'id',
    foreignKey: 'tipo_peligro_id',
    as: 'buscados'
});
exports.BuscadoModel.belongsTo(nivelPeligro_model_1.NivelPeligroModel, {
    targetKey: 'id',
    foreignKey: 'tipo_peligro_id',
    as: 'nivelPeligro'
});
categoria_model_1.CategoriaModel.hasMany(exports.BuscadoModel, {
    sourceKey: 'id',
    foreignKey: 'categoria_id',
    as: 'buscados'
});
exports.BuscadoModel.belongsTo(categoria_model_1.CategoriaModel, {
    targetKey: 'id',
    foreignKey: 'categoria_id',
    as: 'categoria'
});
