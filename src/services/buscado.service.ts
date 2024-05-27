import { Request, Response } from 'express'
import { BuscadoModel, BuscadoCreationAttributes } from '../models/buscado.model'
import { NivelPeligro } from '../models/peligrosidad.model'

export const getBuscados = async (req: Request, res: Response): Promise<void> => {
  try {
    const departments = await BuscadoModel.findAll({
      attributes: { exclude: ['tipo_peligro_id', 'createdAt', 'updatedAt'] },
      include: [
        {
          model: NivelPeligro,
          as: 'nivelPeligro', // Alias que usamos en la relación
          attributes: ['nombre'] // Traer solo la descripción de la categoría
        }
      ]
    })
    res.json(departments)
  } catch (error) {
    console.log(error)
    res.status(500).json({
      msg: 'Internal server error, contact API administrator'
    })
  }
}
export const postBuscados = async (req: Request, res: Response): Promise<void> => {
  try {
    console.log(req.body)
    const { ...BuscadoCreationAttributes }: BuscadoCreationAttributes = req.body
    await BuscadoModel.create(BuscadoCreationAttributes)
    res.status(204).send()
  } catch (error) {
    console.log(error)
    res.status(500).json({
      msg: 'Internal server error, contact API administrator'
    })
  }
}
