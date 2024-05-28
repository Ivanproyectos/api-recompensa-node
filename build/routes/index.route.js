"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const buscadoRoute = (0, express_1.Router)();
buscadoRoute.get('/', (req, res) => res.send('Hello World!'));
exports.default = buscadoRoute;
