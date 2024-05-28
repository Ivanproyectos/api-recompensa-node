import { Request, Response } from 'express'
import { verifyToken } from '../helpers/JwtToken'

export const authorize = (req: Request, res: Response, next: any): any => {
  if (req.headers.authorization === undefined) {
    return res.status(401).send('No tienes autorización')
  }
  try {
    const [, token] = req.headers.authorization?.split(' ')
    // const payload = verifyToken(token)
    verifyToken(token)
  } catch (err) {
    return res.status(401).send('No tienes autorización')
  }

  next()
}
