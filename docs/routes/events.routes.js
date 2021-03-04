"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controller_1 = require("../controller");
const middleware_1 = require("../middleware");
const validators_1 = require("../validators");
const eventRouter = express_1.Router();
// Obtener todos los eventos
eventRouter.get('/', middleware_1.tokenMiddle, controller_1.allControl);
// Obtener eventos por uid
eventRouter.get('/:uid', middleware_1.tokenMiddle, controller_1.getControl);
// Eliminar eventos por _id
eventRouter.delete('/:id', middleware_1.tokenMiddle, controller_1.deleteControl);
// Nuevo Evento
eventRouter.post('/', middleware_1.tokenMiddle, validators_1.eventValid(), controller_1.newControl);
// Editar eventos
eventRouter.put('/:id', middleware_1.tokenMiddle, validators_1.eventValid(), controller_1.editControl);
exports.default = eventRouter;
