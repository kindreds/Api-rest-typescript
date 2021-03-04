"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const bcrypt_1 = __importDefault(require("bcrypt"));
const UserSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
});
/** METHODS */
UserSchema.methods.comparePassword = function (password) {
    return bcrypt_1.default.compareSync(password, this.password);
};
/** MIDDLEWARES */
UserSchema.pre('save', function () {
    if (this.isModified('password')) {
        const salt = bcrypt_1.default.genSaltSync();
        this.password = bcrypt_1.default.hashSync(this.password, salt);
    }
});
exports.default = mongoose_1.model('User', UserSchema);
