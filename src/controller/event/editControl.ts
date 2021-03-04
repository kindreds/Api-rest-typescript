import { Response, Request } from 'express';
import { Types } from 'mongoose';
import logging from '../../helpers/logging';
import EventModel, { Event } from '../../models/Event';

const editControl = async (req: Request, res: Response) => {
  const { id } = req.params;
  const data: Event = req.body;

  if (!Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      ok: false,
      msg: 'ID proporcionado no es de tipo ObjectId',
    });
  }

  try {
    // Modelando el evento
    const event = await EventModel.findByIdAndUpdate(id, data);
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
  } catch (error) {
    logging.error('Get Event by id', error);
    return res.status(500).json({
      ok: false,
      msg: 'Por favor contacte con el administrador',
    });
  }
};

export { editControl };
