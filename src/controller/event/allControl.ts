import { Response, Request } from 'express';
import logging from '../../helpers/logging';
import EventModel from '../../models/Event';

const allControl = async (req: Request, res: Response) => {
  try {
    // Modelando el evento
    const events = await EventModel.find({});
    // Respondiendo con un array de los eventos
    return res.status(201).json({
      ok: true,
      events,
    });
  } catch (error) {
    logging.error('New Event', error);
    return res.status(500).json({
      ok: false,
      msg: 'Por favor contacte con el administrador',
    });
  }
};

export { allControl };
