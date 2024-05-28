import { sequelize } from '../database/recompensadb'
import { DataTypes, Model, Optional } from 'sequelize'
import { NivelPeligro } from './peligrosidad.model'
import { IBuscado } from '../interfaces/buscado.interface'

export interface BuscadoCreationAttributes
  extends Optional<IBuscado, 'id'> {}

interface BuscadoInstance
  extends Model<IBuscado, BuscadoCreationAttributes>,
  IBuscado {
  createdAt?: Date
  updatedAt?: Date
}

export const BuscadoModel = sequelize.define<BuscadoInstance>('buscado', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true
  },
  nombre: {
    type: DataTypes.STRING
  },
  apellidos: {
    type: DataTypes.STRING
  },
  descripcion: {
    type: DataTypes.STRING
  },
  recompensa: {
    type: DataTypes.STRING
  },
  categoriaId: {
    type: DataTypes.INTEGER
  // field: 'categoria_id' // Define el nombre en snake_case para la columna
  },
  tipoPeligroId: {
    type: DataTypes.INTEGER,
    field: 'tipo_peligro_id' // Define el nombre en snake_case para la columna
  },
  image: {
    type: DataTypes.STRING,
    allowNull: false
  }
})

NivelPeligro.hasMany(BuscadoModel, {
  sourceKey: 'id',
  foreignKey: 'tipo_peligro_id',
  as: 'buscados'
})

BuscadoModel.belongsTo(NivelPeligro, {
  targetKey: 'id',
  foreignKey: 'tipo_peligro_id',
  as: 'nivelPeligro'
})
