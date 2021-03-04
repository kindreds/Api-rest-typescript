import { Router } from 'express';

import {
  getControl,
  newControl,
  allControl,
  editControl,
  deleteControl,
} from '../controller';

import { tokenMiddle } from '../middleware';
import { eventValid } from '../validators';

const eventRouter = Router();

// Obtener todos los eventos
eventRouter.get('/', tokenMiddle, allControl);
// Obtener eventos por uid
eventRouter.get('/:uid', tokenMiddle, getControl);
// Eliminar eventos por _id
eventRouter.delete('/:id', tokenMiddle, deleteControl);
// Nuevo Evento
eventRouter.post('/', tokenMiddle, eventValid(), newControl);
// Editar eventos
eventRouter.put('/:id', tokenMiddle, eventValid(), editControl);

export default eventRouter;
