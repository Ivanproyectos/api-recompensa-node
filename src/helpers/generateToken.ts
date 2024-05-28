import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'

/* export const auth = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')?.replace('Bearer ', '')

  if (!token) {
    return res.status(401).send({ error: 'No token provided' })
  }
  try {
    const decoded = jwt.verify(token, 'secret')
    req.user = decoded
    next()
  } catch (error) {
    res.status(400).send({ error: 'Invalid token' })
  }
} */

export const generateToken = (user: any): string => {
  return jwt.sign({ id: user.id }, 'secret', { expiresIn: '1d' })
}
