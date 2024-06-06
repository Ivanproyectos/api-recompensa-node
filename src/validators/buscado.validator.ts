import { check, param } from 'express-validator'
import { Request, Response, NextFunction } from 'express'
import { validateResult } from '../helpers/validateHelper'

const validateIdparam = [
  param('id').isInt().withMessage('El ID debe ser un número entero')
]
const rulesImage = [
  check('image').custom((value, { req }) => {
    if (req.file === undefined) {
      throw new Error('La imagen es obligatoria')
    }
    // Puedes añadir más validaciones de imagen aquí, como el tipo de archivo
    return true
  })
]
export const validateCreate = [
  check('nombre', 'El nombre es obligatorio').notEmpty(),
  check('apellidos', 'Los apellidos son obligatorios').notEmpty(),
  check('recompensa', 'La recompensa es obligatoria').notEmpty()
    .isNumeric()
    .isDecimal()
    .withMessage('la recompensa debe ser un número'),
  check('descripcion', 'La descripción es obligatoria').notEmpty(),
  check('alias', 'El alias es obligatorio').notEmpty(),
  check('tipoPeligroId', 'El tipo de peligro es obligatorio').notEmpty()
    .isNumeric()
    .withMessage('el tipo de peligro debe ser un número'),
  // check('image', 'La imagen es obligatoria').notEmpty(),
  ...rulesImage,
  (req: Request, res: Response, next: NextFunction) => {
    validateResult(req, res, next)
  }
]
export const valiteUpdate = [
  ...validateIdparam,
  ...validateCreate
]
export const valiteDelete = [
  ...validateIdparam,
  (req: Request, res: Response, next: NextFunction) => {
    validateResult(req, res, next)
  }
]

export const validateUpdateImagen = [
  ...validateIdparam,
  ...rulesImage,
  (req: Request, res: Response, next: NextFunction) => {
    validateResult(req, res, next)
  }
]
