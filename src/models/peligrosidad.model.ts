import { sequelize } from '../database/recompensadb'
import { DataTypes } from 'sequelize'

export const NivelPeligro = sequelize.define('nivel_peligros', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  }
})
