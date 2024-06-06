"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUpdateImagen = exports.valiteDelete = exports.valiteUpdate = exports.validateCreate = void 0;
const express_validator_1 = require("express-validator");
const validateHelper_1 = require("../helpers/validateHelper");
const validateIdparam = [
    (0, express_validator_1.param)('id').isInt().withMessage('El ID debe ser un número entero')
];
const rulesImage = [
    (0, express_validator_1.check)('image').custom((value, { req }) => {
        if (req.file === undefined) {
            throw new Error('La imagen es obligatoria');
        }
        // Puedes añadir más validaciones de imagen aquí, como el tipo de archivo
        return true;
    })
];
exports.validateCreate = [
    (0, express_validator_1.check)('nombre', 'El nombre es obligatorio').notEmpty(),
    (0, express_validator_1.check)('apellidos', 'Los apellidos son obligatorios').notEmpty(),
    (0, express_validator_1.check)('recompensa', 'La recompensa es obligatoria').notEmpty()
        .isNumeric()
        .isDecimal()
        .withMessage('la recompensa debe ser un número'),
    (0, express_validator_1.check)('descripcion', 'La descripción es obligatoria').notEmpty(),
    (0, express_validator_1.check)('alias', 'El alias es obligatorio').notEmpty(),
    (0, express_validator_1.check)('tipoPeligroId', 'El tipo de peligro es obligatorio').notEmpty()
        .isNumeric()
        .withMessage('el tipo de peligro debe ser un número'),
    // check('image', 'La imagen es obligatoria').notEmpty(),
    ...rulesImage,
    (req, res, next) => {
        (0, validateHelper_1.validateResult)(req, res, next);
    }
];
exports.valiteUpdate = [
    ...validateIdparam,
    ...exports.validateCreate
];
exports.valiteDelete = [
    ...validateIdparam,
    (req, res, next) => {
        (0, validateHelper_1.validateResult)(req, res, next);
    }
];
exports.validateUpdateImagen = [
    ...validateIdparam,
    ...rulesImage,
    (req, res, next) => {
        (0, validateHelper_1.validateResult)(req, res, next);
    }
];
