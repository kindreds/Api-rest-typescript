import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import isJWT from 'validator/lib/isJWT';

const tokenMiddle = (req: Request, res: Response, next: NextFunction) => {
  const token: string | undefined = req.header('x-token');

  if (!token) {
    return res.status(401).json({
      ok: false,
      msg: 'Token no ha sido enviado',
    });
  }

  if (!isJWT(token)) {
    return res.status(401).json({
      ok: false,
      msg: 'Token no es valido',
    });
  }

  try {
    jwt.verify(token, process.env.SECRET_JWT || 'testToken');
  } catch (error) {
    return res.status(401).json({
      ok: false,
      msg: error.msg,
    });
  }

  next();
};

export { tokenMiddle };
