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
exports.deleteBuscados = exports.actualizarImagen = exports.putBuscados = exports.postBuscados = exports.getByIdBuscados = exports.getBuscados = void 0;
const buscado_model_1 = require("../models/buscado.model");
const nivelPeligro_model_1 = require("../models/nivelPeligro.model");
const categoria_model_1 = require("../models/categoria.model");
const sequelize_1 = require("sequelize");
const getBuscados = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const categoryId = Number.isNaN(Number(req.query.categoryId)) ||
            Number(req.query.categoryId) === 0
            ? null
            : Number(req.query.categoryId);
        const aliasOrName = String((_a = req.query.filter) !== null && _a !== void 0 ? _a : '');
        const options = {
            where: {
                categoriaId: { [sequelize_1.Op.eq]: (0, sequelize_1.fn)('IFNULL', categoryId, (0, sequelize_1.col)('categoria_id')) },
                [sequelize_1.Op.or]: [
                    { nombre: { [sequelize_1.Op.like]: `%${aliasOrName}%` } },
                    { alias: { [sequelize_1.Op.like]: `%${aliasOrName}%` } },
                    { apellidos: { [sequelize_1.Op.like]: `%${aliasOrName}%` } }
                ]
            },
            attributes: { exclude: ['tipo_peligro_id', 'categoria_id', 'createdAt', 'updatedAt'] },
            include: [
                { model: nivelPeligro_model_1.NivelPeligroModel, as: 'nivelPeligro', attributes: ['nombre'] },
                { model: categoria_model_1.CategoriaModel, as: 'categoria', attributes: ['nombre'] }
            ]
        };
        const buscados = yield buscado_model_1.BuscadoModel.findAll(options);
        const apiImageUrl = `${req.protocol}://${(_b = req.get('host')) !== null && _b !== void 0 ? _b : 'localhost'}/api/download/image/`;
        const buscadosWithImageUrl = buscados.map(buscado => (Object.assign(Object.assign({}, buscado.get({ plain: true })), { image: `${apiImageUrl}${buscado.image}` })));
        res.json(buscadosWithImageUrl);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error, contact API administrator' });
    }
});
exports.getBuscados = getBuscados;
const getByIdBuscados = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    try {
        const id = req.params.id;
        const buscado = yield buscado_model_1.BuscadoModel.findByPk(id, {
            attributes: { exclude: ['tipo_peligro_id', 'categoria_id', 'createdAt', 'updatedAt'] },
            include: [
                {
                    model: nivelPeligro_model_1.NivelPeligroModel,
                    as: 'nivelPeligro', // Alias que usamos en la relación
                    attributes: ['nombre'] // Traer solo la descripción de la categoría
                },
                {
                    model: categoria_model_1.CategoriaModel,
                    as: 'categoria', // Alias que usamos en la relación
                    attributes: ['nombre'] // Traer solo la descripción de la categoría
                }
            ]
        });
        if (buscado == null) {
            return res.status(404).json({
                msg: 'persona buscada no encontrado'
            });
        }
        const apiImageUrl = `${req.protocol}://${(_c = req.get('host')) !== null && _c !== void 0 ? _c : 'localhost'}/api/download/image/`;
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
    var _d, _e;
    try {
        const { nombre, apellidos, recompensa, categoriaId, tipoPeligroId, descripcion, alias } = req.body;
        const filename = (_e = (_d = req === null || req === void 0 ? void 0 : req.file) === null || _d === void 0 ? void 0 : _d.filename) !== null && _e !== void 0 ? _e : 'no-image.png';
        yield buscado_model_1.BuscadoModel.create({ nombre, apellidos, recompensa, categoriaId, tipoPeligroId, descripcion, alias, image: filename });
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
const actualizarImagen = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _f, _g;
    try {
        const { id } = req.params;
        const filename = (_g = (_f = req === null || req === void 0 ? void 0 : req.file) === null || _f === void 0 ? void 0 : _f.filename) !== null && _g !== void 0 ? _g : 'no-image.png';
        const updatedBuscado = yield buscado_model_1.BuscadoModel.findByPk(id);
        if (updatedBuscado == null) {
            return res.status(404).json({ message: 'persona buscada not found' });
        }
        updatedBuscado.image = filename;
        yield updatedBuscado.save();
        return res.status(200).send();
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error, contact API administrator' });
    }
});
exports.actualizarImagen = actualizarImagen;
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
