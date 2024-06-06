"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const buscado_service_1 = require("../services/buscado.service");
const buscado_validator_1 = require("../validators/buscado.validator");
const auth_1 = require("../middlewares/auth");
const uploadHelper_1 = __importDefault(require("../helpers/uploadHelper"));
const buscadoRoute = (0, express_1.Router)();
buscadoRoute.get('/buscados', buscado_service_1.getBuscados);
buscadoRoute.get('/buscados/:id', buscado_service_1.getByIdBuscados);
buscadoRoute.post('/buscados', auth_1.authorize, uploadHelper_1.default.single('image'), buscado_validator_1.validateCreate, buscado_service_1.postBuscados);
buscadoRoute.put('/buscados/:id', uploadHelper_1.default.single('image'), buscado_validator_1.valiteUpdate, buscado_service_1.putBuscados);
buscadoRoute.patch('/buscados-image/:id', uploadHelper_1.default.single('image'), buscado_validator_1.validateUpdateImagen, buscado_service_1.actualizarImagen);
buscadoRoute.delete('/buscados/:id', buscado_validator_1.valiteDelete, buscado_service_1.deleteBuscados);
exports.default = buscadoRoute;
