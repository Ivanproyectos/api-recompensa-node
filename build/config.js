"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b, _c, _d, _e, _f;
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbConfig = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.default = {
    port: (_a = process.env.PORT) !== null && _a !== void 0 ? _a : 3000,
    JWT_SECRET: process.env.JWT_SECRET
};
exports.dbConfig = {
    host: (_b = process.env.DB_HOST) !== null && _b !== void 0 ? _b : 'localhost',
    port: (_c = Number(process.env.BD_PORT)) !== null && _c !== void 0 ? _c : 3306,
    username: (_d = process.env.DB_USER) !== null && _d !== void 0 ? _d : 'root',
    password: (_e = process.env.DB_PASS) !== null && _e !== void 0 ? _e : 'admin',
    database: (_f = process.env.DB_DATABASE) !== null && _f !== void 0 ? _f : 'recompensa'
};
