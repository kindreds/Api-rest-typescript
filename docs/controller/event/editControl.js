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
exports.editControl = void 0;
const mongoose_1 = require("mongoose");
const logging_1 = __importDefault(require("../../helpers/logging"));
const Event_1 = __importDefault(require("../../models/Event"));
const editControl = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const data = req.body;
    if (!mongoose_1.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
            ok: false,
            msg: 'ID proporcionado no es de tipo ObjectId',
        });
    }
    try {
        // Modelando el evento
        const event = yield Event_1.default.findByIdAndUpdate(id, data);
        if (!event) {
            return res.status(400).json({
                ok: false,
                msg: 'ID proporcionado no existe en la BD',
            });
        }
        // Retornando mensaje en caso de exito
        return res.status(201).json({
            ok: true,
            msg: 'Evento modificado con exito',
        });
    }
    catch (error) {
        logging_1.default.error('Get Event by id', error);
        return res.status(500).json({
            ok: false,
            msg: 'Por favor contacte con el administrador',
        });
    }
});
exports.editControl = editControl;
