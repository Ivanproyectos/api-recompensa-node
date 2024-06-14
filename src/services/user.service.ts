import { Request, Response } from 'express'
import { User } from '../models/user.model'
import { generateToken } from '../helpers/JwtToken'
import { IAuth } from '../interfaces/auth.interface'

export const validarUsuario = async (req: Request, res: Response, next: any): Promise<Response> => {
  const { correo, password } = req.body
  const usuario = await User.findOne({ where: { correo, password } })
  if (usuario == null) {
    return res.status(401).send({ error: 'Usuario o contraseña incorrecta' })
  }
  const response: IAuth = generateToken(usuario)
  return res.status(200).send(response)
}
