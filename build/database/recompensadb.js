"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
const sequelize_1 = require("sequelize");
const config_1 = require("../config");
exports.sequelize = new sequelize_1.Sequelize(config_1.dbConfig.database, config_1.dbConfig.username, config_1.dbConfig.password, {
    port: config_1.dbConfig.port,
    host: config_1.dbConfig.host,
    dialect: 'mysql',
    define: {
        underscored: true // Esta opción habilita la conversión automática de camelCase a snake_case
    }
});
console.log(' Database: ' + config_1.dbConfig.database);
console.log(' User: ' + config_1.dbConfig.username);
console.log(' Password: ' + config_1.dbConfig.password);
console.log(`port: ${config_1.dbConfig.port}`);
console.log(' Host: ' + config_1.dbConfig.host);
