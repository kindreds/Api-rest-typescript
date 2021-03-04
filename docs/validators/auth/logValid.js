"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logValid = void 0;
const express_validator_1 = require("express-validator");
const types_1 = require("../../types/types");
const middleware_1 = require("../../middleware");
const logValid = () => {
    const { email, password } = types_1.auth;
    return [
        /** Email */
        express_validator_1.check('email', email.invalid).isEmail(),
        express_validator_1.check('email', email.empty).not().isEmpty(),
        /** Password */
        express_validator_1.check('password', password.empty).not().isEmpty(),
        middleware_1.collector,
    ];
};
exports.logValid = logValid;
