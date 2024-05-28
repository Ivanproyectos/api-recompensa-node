import { Request, Response } from 'express'
import { User } from '../models/user.model'
import { generateToken } from '../helpers/generateToken'

export const validarUsuario = async (req: Request, res: Response, next: any): Promise<Response> => {
  const { correo, password } = req.body
  console.log(correo)
  const usuario = await User.findOne({ where: { correo, password } })
  if (usuario == null) {
    return res.status(404).send({ error: 'Usuario no encontrado' })
  }
  const token = generateToken({ id: usuario.id })
  return res.status(200).send({ token })
}
