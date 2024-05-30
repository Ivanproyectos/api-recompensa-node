import { sequelize } from '../database/recompensadb'
import { DataTypes } from 'sequelize'

export const CategoriaModel = sequelize.define('categoria_delitos', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  }
})
