import { Router } from 'express'
import { getCategorias } from '../services/categoria.service'

const categoriaRoute = Router()

categoriaRoute.get('/categorias', getCategorias as any)

export default categoriaRoute
