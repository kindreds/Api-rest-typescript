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
exports.regValid = void 0;
const express_validator_1 = require("express-validator");
const User_1 = __importDefault(require("../../models/User"));
const types_1 = require("../../types/types");
const middleware_1 = require("../../middleware");
const regValid = () => {
    const { name, email, password, password2 } = types_1.auth;
    const isEmailUsed = (value) => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield User_1.default.findOne({ email: value });
        if (user)
            return Promise.reject(email.used);
    });
    const pass1 = (v) => /(?=.*[\d])(?=.*[\w]).{8,}/g.test(v);
    const pass2 = (v, { req }) => v === req.body.password;
    return [
        /** Name */
        express_validator_1.check('name', name.empty).not().isEmpty(),
        express_validator_1.check('name', name.invalid).isLength({ min: 3 }),
        /** Email */
        express_validator_1.check('email', email.invalid).isEmail(),
        express_validator_1.check('email', email.empty).not().isEmpty(),
        express_validator_1.check('email', email.used).custom(isEmailUsed),
        /** Password */
        express_validator_1.check('password', password.empty).not().isEmpty(),
        express_validator_1.check('password', password.invalid).custom(pass1),
        /** Confirm Password */
        express_validator_1.check('password2', password2.empty).not().isEmpty(),
        express_validator_1.check('password2', password2.invalid).custom(pass2),
        middleware_1.collector,
    ];
};
exports.regValid = regValid;
