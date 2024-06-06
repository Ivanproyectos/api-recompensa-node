import { Router } from 'express'
import { getBuscados, postBuscados, getByIdBuscados, putBuscados, deleteBuscados, actualizarImagen } from '../services/buscado.service'
import { validateCreate, valiteUpdate, valiteDelete, validateUpdateImagen } from '../validators/buscado.validator'
import { authorize } from '../middlewares/auth'
import upload from '../helpers/uploadHelper'

const buscadoRoute = Router()

buscadoRoute.get('/buscados', getBuscados as any)
buscadoRoute.get('/buscados/:id', getByIdBuscados as any)
buscadoRoute.post('/buscados', authorize, upload.single('image'), validateCreate, postBuscados as any)
buscadoRoute.put('/buscados/:id', upload.single('image'), valiteUpdate, putBuscados as any)
buscadoRoute.patch('/buscados-image/:id', upload.single('image'), validateUpdateImagen, actualizarImagen as any)
buscadoRoute.delete('/buscados/:id', valiteDelete, deleteBuscados as any)
export default buscadoRoute
