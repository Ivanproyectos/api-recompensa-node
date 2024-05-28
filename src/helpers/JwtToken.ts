import jwt, { JwtPayload } from 'jsonwebtoken'
import { IUser } from '../interfaces/user.interface'
import config from '../config'
import { IAuth } from '../interfaces/auth.interface'

export const verifyToken = (token: string): JwtPayload => {
  try {
    return jwt.verify(token, config.JWT_SECRET as string) as JwtPayload
  } catch (error) {
    throw new Error('Invalid token')
  }
}
export const generateToken = (user: IUser): IAuth => {
  const { id, correo, nombre, apellidos } = user
  const token = jwt.sign({ id, correo, nombre, apellidos }, config.JWT_SECRET as string, { expiresIn: '1h' })
  const payload = verifyToken(token)
  return {
    token,
    expires: payload.exp as number
  }
}
