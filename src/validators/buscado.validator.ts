import { check } from 'express-validator'
import { Request, Response, NextFunction } from 'express'
import { validateResult } from '../helpers/validateHelper'

export const validateCreate = [
  check('nombre', 'El nombre es obligatorio').notEmpty(),
  check('apellidos', 'Los apellidos son obligatorios').notEmpty(),
  check('recompensa', 'La recompensa es obligatoria').notEmpty()
    .isNumeric()
    .isDecimal()
    .withMessage('la recompensa debe ser un número'),
  check('descripcion', 'La descripción es obligatoria').notEmpty(),
  check('tipoPeligroId', 'El tipo de peligro es obligatorio').notEmpty()
    .isNumeric()
    .withMessage('el tipo de peligro debe ser un número'),
  (req: Request, res: Response, next: NextFunction) => {
    validateResult(req, res, next)
  }
]
