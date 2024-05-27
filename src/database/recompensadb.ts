import { Sequelize } from 'sequelize'

export const sequelize = new Sequelize('recompensa', 'root', 'admin', {
  host: 'localhost',
  dialect: 'mysql',
  define: {
    underscored: true // Esta opción habilita la conversión automática de camelCase a snake_case
  }
})

/* (async () => {
  try {
    await sequelize.sync({ alter: true })
  } catch (error) {
    console.error('Unable to connect to the database:', error)
  }
})() */
