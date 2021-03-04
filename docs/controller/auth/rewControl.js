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
exports.rewControl = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const jwt_1 = require("../../helpers/jwt");
const logging_1 = __importDefault(require("../../helpers/logging"));
const rewControl = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.header('x-token');
    try {
        const payload = jsonwebtoken_1.default.verify(token, process.env.SECRET_JWT || 'testtoken');
        const newToken = yield jwt_1.genJWT({
            uid: payload.uid,
            name: payload.name,
            email: payload.email,
        });
        return res.status(200).json({
            ok: true,
            uid: payload.uid,
            name: payload.name,
            email: payload.email,
            token: newToken === null || newToken === void 0 ? void 0 : newToken.token,
            expiredAt: newToken === null || newToken === void 0 ? void 0 : newToken.expiredAt,
        });
    }
    catch (error) {
        logging_1.default.error('Renew Controller', `Error: ${error}`);
        switch (error.name) {
            case 'TokenExpiredError':
                return res.status(400).json({
                    ok: false,
                    msg: error.message,
                    expiredAt: +new Date(error.expiredAt),
                });
            case 'JsonWebTokenError':
                return res.status(400).json({
                    ok: false,
                    msg: error.message,
                });
            default:
                return res.status(500).json({
                    ok: false,
                    msg: 'Por favor contacte con el administrador',
                });
        }
    }
});
exports.rewControl = rewControl;
