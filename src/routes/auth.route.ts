import { Router } from 'express'
import { validarUsuario } from '../services/user.service'

const authRouter = Router()

authRouter.post('/auth/login', validarUsuario as any)

export default authRouter
