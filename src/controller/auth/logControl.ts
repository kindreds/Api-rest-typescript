import { Response, Request } from 'express';

import { genJWT } from '../../helpers/jwt';
import logging from '../../helpers/logging';
import UserModel, { User } from '../../models/User';

const logControl = async (req: Request, res: Response): Promise<Response> => {
  const bodyData: User = req.body;

  try {
    // Comparar el email con la base de datos
    const user = await UserModel.findOne({ email: bodyData.email });

    const { token, expiredAt } = await genJWT({
      uid: user?._id,
      name: user?.name,
      email: user?.email,
    });

    return res.status(201).json({
      ok: true,
      uid: user?.id,
      name: user?.name,
      email: user?.email,
      token,
      expiredAt,
    });
  } catch (error) {
    logging.error('Login Controller', `Error: ${error}`);
    return res.status(500).json({
      ok: false,
      msg: 'Por favor contacte con el administrador',
    });
  }
};

export { logControl };
