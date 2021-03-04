import { Response, Request } from 'express';
import { Types } from 'mongoose';
import logging from '../../helpers/logging';
import EventModel from '../../models/Event';

const getControl = async (req: Request, res: Response) => {
  const { uid } = req.params;

  if (!Types.ObjectId.isValid(uid)) {
    return res.status(400).json({
      ok: false,
      msg: 'ID proporcionado no es de tipo ObjectId',
    });
  }

  try {
    // Modelando el evento
    const events = await EventModel.find({ createdBy: uid });
    const assigned = await EventModel.find({ assignedTo: uid });
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
  } catch (error) {
    logging.error('Get Event by id', error);
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: 'Por favor contacte con el administrador',
    });
  }
};

export { getControl };
