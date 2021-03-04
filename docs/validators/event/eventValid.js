"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.eventValid = void 0;
const express_validator_1 = require("express-validator");
const middleware_1 = require("../../middleware");
const types_1 = require("../../types/types");
const eventValid = () => {
    const { title, important, complete } = types_1.eventType;
    const isBool = (v) => typeof v === 'boolean';
    return [
        /** Title */
        express_validator_1.check('title', title.empty).not().isEmpty(),
        /** Important */
        express_validator_1.check('important', important.empty).not().isEmpty(),
        express_validator_1.check('important', important.invalid).custom(isBool),
        /** Important */
        express_validator_1.check('complete', complete.empty).not().isEmpty(),
        express_validator_1.check('complete', complete.invalid).custom(isBool),
        middleware_1.collector,
    ];
};
exports.eventValid = eventValid;
