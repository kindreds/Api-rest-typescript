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
exports.logMiddle = void 0;
const types_1 = require("../../types/types");
const User_1 = __importDefault(require("../../models/User"));
const logMiddle = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = types_1.auth;
    const user = yield User_1.default.findOne({ email: req.body.email });
    if (!user) {
        return res.status(401).json({
            ok: false,
            errors: {
                email: {
                    param: 'email',
                    location: 'body',
                    msg: email.notUsed,
                    value: req.body.email,
                },
            },
        });
    }
    const validPass = user === null || user === void 0 ? void 0 : user.comparePassword(req.body.password);
    if (!validPass) {
        return res.status(401).json({
            ok: false,
            errors: {
                password: {
                    location: 'body',
                    param: 'password',
                    msg: password.notEqual,
                    value: req.body.password,
                },
            },
        });
    }
    next();
});
exports.logMiddle = logMiddle;
