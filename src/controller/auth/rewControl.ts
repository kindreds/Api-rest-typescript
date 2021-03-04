import jwt from 'jsonwebtoken';
import { Response, Request } from 'express';

import { genJWT } from '../../helpers/jwt';
import logging from '../../helpers/logging';

export const rewControl = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const token = req.header('x-token');

  try {
    const payload = jwt.verify(token!, process.env.SECRET_JWT || 'testtoken');
    const newToken = await genJWT({
      uid: (<any>payload).uid,
      name: (<any>payload).name,
      email: (<any>payload).email,
    });

    return res.status(200).json({
      ok: true,
      uid: (<any>payload).uid,
      name: (<any>payload).name,
      email: (<any>payload).email,
      token: newToken?.token,
      expiredAt: newToken?.expiredAt,
    });
  } catch (error) {
    logging.error('Renew Controller', `Error: ${error}`);
    switch (error.name) {
      case 'TokenExpiredError':
        return res.status(400).json({
          ok: false,
          msg: error.message,
          expiredAt: +new Date(error.expiredAt),
        });

      case 'JsonWebTokenError':
        return res.status(400).json({
          ok: false,
          msg: error.message,
        });

      default:
        return res.status(500).json({
          ok: false,
          msg: 'Por favor contacte con el administrador',
        });
    }
  }
};
