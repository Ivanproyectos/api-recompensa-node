import { Router } from 'express'
import { getImage } from '../services/donwload.service'

const buscadoRoute = Router()

buscadoRoute.get('/donwload/image/:id', getImage as any)

export default buscadoRoute
