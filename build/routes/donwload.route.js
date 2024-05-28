"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const donwload_service_1 = require("../services/donwload.service");
const buscadoRoute = (0, express_1.Router)();
buscadoRoute.get('/download/image/:id', donwload_service_1.getImage);
exports.default = buscadoRoute;
