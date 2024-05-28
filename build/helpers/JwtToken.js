"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config"));
const verifyToken = (token) => {
    try {
        return jsonwebtoken_1.default.verify(token, config_1.default.JWT_SECRET);
    }
    catch (error) {
        throw new Error('Invalid token');
    }
};
exports.verifyToken = verifyToken;
const generateToken = (user) => {
    const { id, correo, nombre, apellidos } = user;
    const token = jsonwebtoken_1.default.sign({ id, correo, nombre, apellidos }, config_1.default.JWT_SECRET, { expiresIn: '1h' });
    const payload = (0, exports.verifyToken)(token);
    return {
        token,
        expires: payload.exp
    };
};
exports.generateToken = generateToken;
