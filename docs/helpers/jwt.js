"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.genJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const logging_1 = __importDefault(require("./logging"));
const ms_1 = __importDefault(require("ms"));
const expiredIn = ms_1.default('30m');
const genJWT = (payload) => new Promise((resolve, reject) => {
    jsonwebtoken_1.default.sign(payload, process.env.SECRET_JWT || 'testtoken', { expiresIn: '30m' }, (error, token) => {
        if (error) {
            logging_1.default.error('GEN JWT', `Error: ${error}`);
            reject('No se ha podido generar el token');
        }
        const expiredAt = +new Date() + expiredIn;
        resolve({ token, expiredAt });
    });
});
exports.genJWT = genJWT;
