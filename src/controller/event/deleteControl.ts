import { Response, Request } from 'express';
import { Types } from 'mongoose';
import logging from '../../helpers/logging';
import EventModel from '../../models/Event';

const deleteControl = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      ok: false,
      msg: 'ID proporcionado no es de tipo ObjectId',
    });
  }

  try {
    const event = await EventModel.findByIdAndDelete(id);
    if (!event) {
      return res.status(400).json({
        ok: false,
        msg: 'ID proporcionado no existe en la BD',
      });
    }
    return res.status(201).json({
      ok: true,
      msg: 'Evento eliminado con exito',
    });
  } catch (error) {
    logging.error('Get Event by id', error);
    return res.status(500).json({
      ok: false,
      msg: 'Por favor contacte con el administrador',
    });
  }
};

export { deleteControl };
