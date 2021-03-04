import { Request, Response, NextFunction } from 'express';

import { auth } from '../../types/types';
import UserModel from '../../models/User';

const logMiddle = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = auth;
  const user = await UserModel.findOne({ email: req.body.email });

  if (!user) {
    return res.status(401).json({
      ok: false,
      errors: {
        email: {
          param: 'email',
          location: 'body',
          msg: email.notUsed,
          value: req.body.email,
        },
      },
    });
  }

  const validPass = user?.comparePassword(req.body.password);

  if (!validPass) {
    return res.status(401).json({
      ok: false,
      errors: {
        password: {
          location: 'body',
          param: 'password',
          msg: password.notEqual,
          value: req.body.password,
        },
      },
    });
  }

  next();
};

export { logMiddle };
