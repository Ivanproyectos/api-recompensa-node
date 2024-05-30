import { Sequelize } from 'sequelize'
import { dbConfig } from '../config'

export const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
  port: dbConfig.port,
  host: dbConfig.host,
  dialect: 'mysql',
  define: {
    underscored: true // Esta opción habilita la conversión automática de camelCase a snake_case
  }
})
