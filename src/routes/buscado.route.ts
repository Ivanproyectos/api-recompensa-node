import { Router } from 'express'
import { getBuscados, postBuscados } from '../services/buscado.service'
import { validateCreate } from '../validators/buscado.validator'

const buscadoRoute = Router()

buscadoRoute.get('/buscados', getBuscados as any)
buscadoRoute.post('/buscados', validateCreate, postBuscados as any)
export default buscadoRoute
