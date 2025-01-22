import { Sequelize } from 'sequelize'
import { dbConfig } from '../config'

export const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
  host: dbConfig.host,
  port: dbConfig.port,
  dialect: 'postgres',
  protocol: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,          // Obliga el uso de SSL
      rejectUnauthorized: false, // Acepta certificados no verificados
    },
  },
  define: {
    underscored: true // Esta opción habilita la conversión automática de camelCase a snake_case
  }
})
