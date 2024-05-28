import { Router } from 'express'
import { getBuscados, postBuscados, getByIdBuscados, putBuscados, deleteBuscados } from '../services/buscado.service'
import { validateCreate, valiteUpdate, valiteDelete } from '../validators/buscado.validator'
import { authorize } from '../middlewares/auth'
import upload from '../helpers/uploadHelper'

const buscadoRoute = Router()

buscadoRoute.get('/buscados', authorize, getBuscados as any)
buscadoRoute.get('/buscados/:id', getByIdBuscados as any)
buscadoRoute.post('/buscados', upload.single('image'), validateCreate, postBuscados as any)
buscadoRoute.put('/buscados/:id', valiteUpdate, putBuscados as any)
buscadoRoute.delete('/buscados/:id', valiteDelete, deleteBuscados as any)
export default buscadoRoute
