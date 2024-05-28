import { Request, Response } from 'express'
import { BuscadoModel } from '../models/buscado.model'
import { NivelPeligro } from '../models/peligrosidad.model'

export const getBuscados = async (req: Request, res: Response): Promise<void> => {
  try {
    const buscados = await BuscadoModel.findAll({
      attributes: { exclude: ['tipo_peligro_id', 'createdAt', 'updatedAt'] },
      include: [
        {
          model: NivelPeligro,
          as: 'nivelPeligro', // Alias que usamos en la relación
          attributes: ['nombre'] // Traer solo la descripción de la categoría
        }
      ]
    })
    const buscadosMap = buscados.map(buscado => {
      buscado.image = `${req.protocol}://${req.get('host') ?? 'localhost'}/images/${buscado.image}`
      return buscado
    })
    res.json(buscadosMap)
  } catch (error) {
    console.log(error)
    res.status(500).json({
      msg: 'Internal server error, contact API administrator'
    })
  }
}
export const getByIdBuscados = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.params.id
    const buscado = await BuscadoModel.findByPk(id, {
      attributes: { exclude: ['tipo_peligro_id', 'createdAt', 'updatedAt'] },
      include: [
        {
          model: NivelPeligro,
          as: 'nivelPeligro', // Alias que usamos en la relación
          attributes: ['nombre'] // Traer solo la descripción de la categoría
        }
      ]
    })
    res.status(200).json(buscado)
  } catch (error) {
    console.log(error)
    res.status(500).json({
      msg: 'Internal server error, contact API administrator'
    })
  }
}
export const postBuscados = async (req: Request, res: Response): Promise<void> => {
  try {
    const { nombre, apellidos, recompensa, categoriaId, tipoPeligroId, descripcion } = req.body
    const filename = req?.file?.filename ?? 'no-image.png'
    // await BuscadoModel.create({ nombre, apellidos, recompensa, categoriaId, tipoPeligroId, descripcion, image: filename })
    res.status(201).send()
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Internal server error, contact API administrator' })
  }
}
export const putBuscados = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id } = req.params
    const { nombre, apellidos, recompensa, categoriaId, tipoPeligroId, descripcion } = req.body
    const updatedBuscado = await BuscadoModel.findByPk(id)
    if (updatedBuscado == null) {
      return res.status(404).json({ message: 'Buscado not found' })
    }
    updatedBuscado.nombre = nombre
    updatedBuscado.apellidos = apellidos
    updatedBuscado.recompensa = recompensa
    updatedBuscado.categoriaId = categoriaId
    updatedBuscado.tipoPeligroId = tipoPeligroId
    updatedBuscado.descripcion = descripcion
    await updatedBuscado.save()
    return res.status(200).send()
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'Internal server error, contact API administrator' })
  }
}
export const deleteBuscados = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id } = req.params
    const rowsAffected = await BuscadoModel.destroy({ where: { id } })
    if (rowsAffected === 0) {
      return res.status(404).json({ message: 'el buscado a eliminar no existe' })
    }
    return res.sendStatus(200)
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'Internal server error, contact API administrator' })
  }
}
