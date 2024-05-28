"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBuscados = exports.putBuscados = exports.postBuscados = exports.getByIdBuscados = exports.getBuscados = void 0;
const buscado_model_1 = require("../models/buscado.model");
const peligrosidad_model_1 = require("../models/peligrosidad.model");
const getBuscados = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const buscados = yield buscado_model_1.BuscadoModel.findAll({
            attributes: { exclude: ['tipoPeligroId', 'createdAt', 'updatedAt'] },
            include: [
                {
                    model: peligrosidad_model_1.NivelPeligro,
                    as: 'nivelPeligro',
                    attributes: ['nombre']
                }
            ]
        });
        const apiImageUrl = `${req.protocol}://${(_a = req.get('host')) !== null && _a !== void 0 ? _a : 'localhost'}/api/download/image/`;
        const buscadosWithImageUrl = buscados.map(buscado => (Object.assign(Object.assign({}, buscado.get({ plain: true })), { image: `${apiImageUrl}${buscado.image}` })));
        res.json(buscadosWithImageUrl);
    }
    catch (error) {
        res.status(500).json({ message: 'Internal server error, contact API administrator' });
    }
});
exports.getBuscados = getBuscados;
const getByIdBuscados = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        const id = req.params.id;
        const buscado = yield buscado_model_1.BuscadoModel.findByPk(id, {
            attributes: { exclude: ['tipo_peligro_id', 'createdAt', 'updatedAt'] },
            include: [
                {
                    model: peligrosidad_model_1.NivelPeligro,
                    as: 'nivelPeligro', // Alias que usamos en la relación
                    attributes: ['nombre'] // Traer solo la descripción de la categoría
                }
            ]
        });
        if (buscado == null) {
            return res.status(404).json({
                msg: 'persona buscada no encontrado'
            });
        }
        const apiImageUrl = `${req.protocol}://${(_b = req.get('host')) !== null && _b !== void 0 ? _b : 'localhost'}/api/download/image/`;
        const buscadoWithImageUrl = Object.assign(Object.assign({}, buscado.get({ plain: true })), { image: `${apiImageUrl}${buscado.image}` });
        return res.status(200).json(buscadoWithImageUrl);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            error: 'Internal server error, contact API administrator'
        });
    }
});
exports.getByIdBuscados = getByIdBuscados;
const postBuscados = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c, _d;
    try {
        const { nombre, apellidos, recompensa, categoriaId, tipoPeligroId, descripcion } = req.body;
        const filename = (_d = (_c = req === null || req === void 0 ? void 0 : req.file) === null || _c === void 0 ? void 0 : _c.filename) !== null && _d !== void 0 ? _d : 'no-image.png';
        yield buscado_model_1.BuscadoModel.create({ nombre, apellidos, recompensa, categoriaId, tipoPeligroId, descripcion, image: filename });
        res.status(201).send();
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error, contact API administrator' });
    }
});
exports.postBuscados = postBuscados;
const putBuscados = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { nombre, apellidos, recompensa, categoriaId, tipoPeligroId, descripcion } = req.body;
        const updatedBuscado = yield buscado_model_1.BuscadoModel.findByPk(id);
        if (updatedBuscado == null) {
            return res.status(404).json({ message: 'Buscado not found' });
        }
        updatedBuscado.nombre = nombre;
        updatedBuscado.apellidos = apellidos;
        updatedBuscado.recompensa = recompensa;
        updatedBuscado.categoriaId = categoriaId;
        updatedBuscado.tipoPeligroId = tipoPeligroId;
        updatedBuscado.descripcion = descripcion;
        yield updatedBuscado.save();
        return res.status(200).send();
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error, contact API administrator' });
    }
});
exports.putBuscados = putBuscados;
const deleteBuscados = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const rowsAffected = yield buscado_model_1.BuscadoModel.destroy({ where: { id } });
        if (rowsAffected === 0) {
            return res.status(404).json({ message: 'el buscado a eliminar no existe' });
        }
        return res.sendStatus(200);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error, contact API administrator' });
    }
});
exports.deleteBuscados = deleteBuscados;
