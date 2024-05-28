import { sequelize } from '../database/recompensadb'
import { DataTypes, Optional, Model } from 'sequelize'
import { IUser } from '../interfaces/user.interface'

export interface UserCreationAttributes
  extends Optional<IUser, 'id'> {}

interface UserInstance
  extends Model<IUser, UserCreationAttributes>,
  IUser {
  createdAt?: Date
  updatedAt?: Date
}
export const User = sequelize.define<UserInstance>('users', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true
  },
  correo: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  apellidos: {
    type: DataTypes.STRING,
    allowNull: false
  }
})
