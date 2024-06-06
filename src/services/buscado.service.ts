import { Request, Response } from 'express'
import { BuscadoModel } from '../models/buscado.model'
import { NivelPeligroModel } from '../models/nivelPeligro.model'
import { CategoriaModel } from '../models/categoria.model'

export const getBuscados = async (req: Request, res: Response): Promise<void> => {
  try {
    const buscados = await BuscadoModel.findAll({
      attributes: { exclude: ['tipo_peligro_id', 'categoria_id', 'createdAt', 'updatedAt'] },
      include: [
        {
          model: NivelPeligroModel,
          as: 'nivelPeligro',
          attributes: ['nombre']
        },
        {
          model: CategoriaModel,
          as: 'categoria', // Alias que usamos en la relación
          attributes: ['nombre'] // Traer solo la descripción de la categoría
        }
      ]
    })
    const apiImageUrl = `${req.protocol}://${req.get('host') ?? 'localhost'}/api/download/image/`
    const buscadosWithImageUrl = buscados.map(buscado => ({
      ...buscado.get({ plain: true }),
      image: `${apiImageUrl}${buscado.image}`
    }))
    res.json(buscadosWithImageUrl)
  } catch (error) {
    res.status(500).json({ message: 'Internal server error, contact API administrator' })
  }
}
export const getByIdBuscados = async (req: Request, res: Response): Promise<Response> => {
  try {
    const id = req.params.id
    const buscado = await BuscadoModel.findByPk(id, {
      attributes: { exclude: ['tipo_peligro_id', 'categoria_id', 'createdAt', 'updatedAt'] },
      include: [
        {
          model: NivelPeligroModel,
          as: 'nivelPeligro', // Alias que usamos en la relación
          attributes: ['nombre'] // Traer solo la descripción de la categoría
        },
        {
          model: CategoriaModel,
          as: 'categoria', // Alias que usamos en la relación
          attributes: ['nombre'] // Traer solo la descripción de la categoría
        }
      ]
    })
    if (buscado == null) {
      return res.status(404).json({
        msg: 'persona buscada no encontrado'
      })
    }
    const apiImageUrl = `${req.protocol}://${req.get('host') ?? 'localhost'}/api/download/image/`
    const buscadoWithImageUrl = {
      ...buscado.get({ plain: true }),
      image: `${apiImageUrl}${buscado.image}`
    }
    return res.status(200).json(buscadoWithImageUrl)
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      error: 'Internal server error, contact API administrator'
    })
  }
}
export const postBuscados = async (req: Request, res: Response): Promise<void> => {
  try {
    const { nombre, apellidos, recompensa, categoriaId, tipoPeligroId, descripcion, alias } = req.body
    const filename = req?.file?.filename ?? 'no-image.png'
    await BuscadoModel.create({ nombre, apellidos, recompensa, categoriaId, tipoPeligroId, descripcion, alias, image: filename })
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
export const actualizarImagen = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id } = req.params
    const filename = req?.file?.filename ?? 'no-image.png'
    const updatedBuscado = await BuscadoModel.findByPk(id)
    if (updatedBuscado == null) {
      return res.status(404).json({ message: 'persona buscada not found' })
    }
    updatedBuscado.image = filename
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
