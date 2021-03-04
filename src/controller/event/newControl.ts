import { Response, Request } from 'express';
import logging from '../../helpers/logging';
import EventModel, { Event } from '../../models/Event';

const newControl = async (req: Request, res: Response) => {
  const data: Event = req.body;

  try {
    // Modelando el evento
    const event = new EventModel(data);
    // Guardando el evento
    await event.save();
    // Respondiendo con el ID
    return res.status(201).json({
      ok: true,
      _id: event._id,
    });
  } catch (error) {
    logging.error('New Event', error);
    return res.status(500).json({
      ok: false,
      msg: 'Por favor contacte con el administrador',
    });
  }
};

export { newControl };
