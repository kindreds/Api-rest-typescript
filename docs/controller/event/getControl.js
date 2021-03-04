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
exports.getControl = void 0;
const mongoose_1 = require("mongoose");
const logging_1 = __importDefault(require("../../helpers/logging"));
const Event_1 = __importDefault(require("../../models/Event"));
const getControl = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { uid } = req.params;
    if (!mongoose_1.Types.ObjectId.isValid(uid)) {
        return res.status(400).json({
            ok: false,
            msg: 'ID proporcionado no es de tipo ObjectId',
        });
    }
    try {
        // Modelando el evento
        const events = yield Event_1.default.find({ createdBy: uid });
        const assigned = yield Event_1.default.find({ assignedTo: uid });
        if (!events) {
            return res.status(400).json({
                ok: false,
                msg: 'ID proporcionado no existe en la BD',
            });
        }
        // Respondiendo con un array de los eventos
        return res.status(201).json({
            ok: true,
            events,
            assigned,
        });
    }
    catch (error) {
        logging_1.default.error('Get Event by id', error);
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Por favor contacte con el administrador',
        });
    }
});
exports.getControl = getControl;
