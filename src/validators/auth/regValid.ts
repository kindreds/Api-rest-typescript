import { check, Meta } from 'express-validator';

import UserModel from '../../models/User';

import { auth } from '../../types/types';
import { collector } from '../../middleware';

const regValid = () => {
  const { name, email, password, password2 } = auth;

  const isEmailUsed = async (value: string): Promise<void> => {
    const user = await UserModel.findOne({ email: value });
    if (user) return Promise.reject(email.used);
  };

  const pass1 = (v: string) => /(?=.*[\d])(?=.*[\w]).{8,}/g.test(v);
  const pass2 = (v: string, { req }: Meta) => v === req.body.password;

  return [
    /** Name */
    check('name', name.empty).not().isEmpty(),
    check('name', name.invalid).isLength({ min: 3 }),
    /** Email */
    check('email', email.invalid).isEmail(),
    check('email', email.empty).not().isEmpty(),
    check('email', email.used).custom(isEmailUsed),
    /** Password */
    check('password', password.empty).not().isEmpty(),
    check('password', password.invalid).custom(pass1),
    /** Confirm Password */
    check('password2', password2.empty).not().isEmpty(),
    check('password2', password2.invalid).custom(pass2),
    collector,
  ];
};

export { regValid };
