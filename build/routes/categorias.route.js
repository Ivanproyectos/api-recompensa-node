"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const categoria_service_1 = require("../services/categoria.service");
const categoriaRoute = (0, express_1.Router)();
categoriaRoute.get('/categorias', categoria_service_1.getCategorias);
exports.default = categoriaRoute;
