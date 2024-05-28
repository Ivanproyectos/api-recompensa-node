"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorize = void 0;
const JwtToken_1 = require("../helpers/JwtToken");
const authorize = (req, res, next) => {
    var _a;
    if (req.headers.authorization === undefined) {
        return res.status(401).send('No tienes autorización');
    }
    try {
        const [, token] = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ');
        // const payload = verifyToken(token)
        (0, JwtToken_1.verifyToken)(token);
    }
    catch (err) {
        return res.status(401).send('No tienes autorización');
    }
    next();
};
exports.authorize = authorize;
