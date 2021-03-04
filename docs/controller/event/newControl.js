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
exports.newControl = void 0;
const logging_1 = __importDefault(require("../../helpers/logging"));
const Event_1 = __importDefault(require("../../models/Event"));
const newControl = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    try {
        // Modelando el evento
        const event = new Event_1.default(data);
        // Guardando el evento
        yield event.save();
        // Respondiendo con el ID
        return res.status(201).json({
            ok: true,
            _id: event._id,
        });
    }
    catch (error) {
        logging_1.default.error('New Event', error);
        return res.status(500).json({
            ok: false,
            msg: 'Por favor contacte con el administrador',
        });
    }
});
exports.newControl = newControl;
