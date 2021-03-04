import { Response, Request } from 'express';
import UserModel, { User } from '../../models/User';

import { genJWT } from '../../helpers/jwt';
import logging from '../../helpers/logging';

export const regControl = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const bodyData: User = req.body;

  try {
    // Modelado del usuario
    const user = new UserModel(bodyData);
    // Grabar el usuario en la DB
    await user.save();
    // Generar Token
    const { token, expiredAt } = await genJWT({
      uid: user?._id,
      name: user?.name,
      email: user?.email,
    });

    return res.status(201).json({
      ok: true,
      uid: user.id,
      name: user.name,
      email: user?.email,
      token,
      expiredAt,
    });
  } catch (error) {
    logging.error('Register Controller', `Error: ${error}`);
    return res.status(500).json({
      ok: false,
      msg: 'Por favor contacte con el administrador',
    });
  }
};
