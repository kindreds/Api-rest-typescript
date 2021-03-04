"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokenMiddle = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const isJWT_1 = __importDefault(require("validator/lib/isJWT"));
const tokenMiddle = (req, res, next) => {
    const token = req.header('x-token');
    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: 'Token no ha sido enviado',
        });
    }
    if (!isJWT_1.default(token)) {
        return res.status(401).json({
            ok: false,
            msg: 'Token no es valido',
        });
    }
    try {
        jsonwebtoken_1.default.verify(token, process.env.SECRET_JWT || 'testToken');
    }
    catch (error) {
        return res.status(401).json({
            ok: false,
            msg: error.msg,
        });
    }
    next();
};
exports.tokenMiddle = tokenMiddle;
