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
exports.validarUsuario = void 0;
const user_model_1 = require("../models/user.model");
const JwtToken_1 = require("../helpers/JwtToken");
const validarUsuario = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { correo, password } = req.body;
    const usuario = yield user_model_1.User.findOne({ where: { correo, password } });
    if (usuario == null) {
        return res.status(401).send({ error: 'Usuario o contraseña incorrecta' });
    }
    const response = (0, JwtToken_1.generateToken)(usuario);
    return res.status(200).send(response);
});
exports.validarUsuario = validarUsuario;
