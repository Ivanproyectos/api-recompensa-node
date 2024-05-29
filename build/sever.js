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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
const recompensadb_1 = require("./database/recompensadb");
const buscado_route_1 = __importDefault(require("./routes/buscado.route"));
const index_route_1 = __importDefault(require("./routes/index.route"));
const auth_route_1 = __importDefault(require("./routes/auth.route"));
const donwload_route_1 = __importDefault(require("./routes/donwload.route"));
const config_1 = __importDefault(require("./config"));
class Server {
    constructor() {
        this.expressApp = (0, express_1.default)();
        this.initializeApp();
    }
    initializeApp() {
        return __awaiter(this, void 0, void 0, function* () {
            this.configureMiddleware();
            this.configureRoutes();
            yield this.connectToDatabase();
        });
    }
    configureMiddleware() {
        this.expressApp.use((0, helmet_1.default)());
        this.expressApp.use(express_1.default.json());
        this.expressApp.use((0, cors_1.default)());
    }
    configureRoutes() {
        this.expressApp.use(index_route_1.default);
        this.expressApp.use(auth_route_1.default);
        this.expressApp.use('/api', buscado_route_1.default);
        this.expressApp.use('/api', donwload_route_1.default);
        this.expressApp.use((req, res) => {
            res.status(404).send({ error: 'endpoint not found' });
        });
    }
    middleware() {
        this.expressApp.use((0, helmet_1.default)({
            crossOriginResourcePolicy: false
        }));
        // esta configuracion establece que nustra carpeta public es un ruta estatica para servir recursos multimedia
        // this.app.use(express.static('public'))
        // this.app.use(helmet())
        this.expressApp.use(express_1.default.json());
        this.expressApp.use((0, cors_1.default)());
    }
    connectToDatabase() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield recompensadb_1.sequelize.authenticate();
                console.log('Connection has been established successfully.');
            }
            catch (error) {
                throw new Error('Failed to connect to the database');
            }
        });
    }
    routes() {
        this.expressApp.use(index_route_1.default);
        this.expressApp.use(auth_route_1.default);
        this.expressApp.use('/api', buscado_route_1.default);
        this.expressApp.use('/api', donwload_route_1.default);
        this.expressApp.use((req, res) => {
            res.status(404).send({ error: 'enpoint not found' });
        });
    }
    listen() {
        this.expressApp.listen(config_1.default.port, () => {
            console.log(`Server on port ${config_1.default.port}: http://localhost:${config_1.default.port}`);
        });
    }
}
exports.default = Server;
