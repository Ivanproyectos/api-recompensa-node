import { Request, Response } from 'express'
import { CategoriaModel } from '../models/categoria.model'

export const getCategorias = async (req: Request, res: Response): Promise<void> => {
  try {
    const categorias = await CategoriaModel.findAll()
    res.json(categorias)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Internal server error, contact API administrator' })
  }
}
