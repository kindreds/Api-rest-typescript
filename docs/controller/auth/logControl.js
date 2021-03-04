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
exports.logControl = void 0;
const jwt_1 = require("../../helpers/jwt");
const logging_1 = __importDefault(require("../../helpers/logging"));
const User_1 = __importDefault(require("../../models/User"));
const logControl = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bodyData = req.body;
    try {
        // Comparar el email con la base de datos
        const user = yield User_1.default.findOne({ email: bodyData.email });
        const { token, expiredAt } = yield jwt_1.genJWT({
            uid: user === null || user === void 0 ? void 0 : user._id,
            name: user === null || user === void 0 ? void 0 : user.name,
            email: user === null || user === void 0 ? void 0 : user.email,
        });
        return res.status(201).json({
            ok: true,
            uid: user === null || user === void 0 ? void 0 : user.id,
            name: user === null || user === void 0 ? void 0 : user.name,
            email: user === null || user === void 0 ? void 0 : user.email,
            token,
            expiredAt,
        });
    }
    catch (error) {
        logging_1.default.error('Login Controller', `Error: ${error}`);
        return res.status(500).json({
            ok: false,
            msg: 'Por favor contacte con el administrador',
        });
    }
});
exports.logControl = logControl;
