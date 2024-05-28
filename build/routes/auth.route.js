"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_service_1 = require("../services/user.service");
const authRouter = (0, express_1.Router)();
authRouter.post('/auth/login', user_service_1.validarUsuario);
exports.default = authRouter;
