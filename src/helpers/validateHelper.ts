import { validationResult } from 'express-validator'
import { Request, Response, NextFunction } from 'express'

export const validateResult = (req: Request, res: Response, next: NextFunction): any => {
  try {
    validationResult(req).throw()
    return next()
  } catch (error: any) {
    return res.status(400).send({ errors: error.array() })
  }
}
