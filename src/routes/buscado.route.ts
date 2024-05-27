import { Router } from 'express'
import { getBuscados, postBuscados, getByIdBuscados, putBuscados, deleteBuscados } from '../services/buscado.service'
import { validateCreate, valiteUpdate, valiteDelete } from '../validators/buscado.validator'

const buscadoRoute = Router()

buscadoRoute.get('/buscados', getBuscados as any)
buscadoRoute.get('/buscados/:id', getByIdBuscados as any)
buscadoRoute.post('/buscados', validateCreate, postBuscados as any)
buscadoRoute.put('/buscados/:id', valiteUpdate, putBuscados as any)
buscadoRoute.delete('/buscados/:id', valiteDelete, deleteBuscados as any)
export default buscadoRoute
