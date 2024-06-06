"use strict";
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
        this.configureMiddleware();
        this.configureRoutes();
        this.connectToDatabase();
    }
    configureMiddleware() {
        this.expressApp.use((0, helmet_1.default)({
            crossOriginResourcePolicy: false
        }));
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
    connectToDatabase() {
        recompensadb_1.sequelize.authenticate().then(() => console.log('Connection has been established successfully.'))
            .catch((error) => console.error('Unable to connect to the database:', error));
        console.log('Connection has been established successfully.');
    }
    start() {
        this.expressApp.listen(config_1.default.port, () => {
            console.log(`Server on port ${config_1.default.port}: http://localhost:${config_1.default.port}`);
        });
    }
}
exports.default = Server;
