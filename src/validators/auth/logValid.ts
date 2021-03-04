import { check, ValidationChain } from 'express-validator';

import { auth } from '../../types/types';
import { collector } from '../../middleware';

const logValid = (): Array<ValidationChain | collector> => {
  const { email, password } = auth;

  return [
    /** Email */
    check('email', email.invalid).isEmail(),
    check('email', email.empty).not().isEmpty(),
    /** Password */
    check('password', password.empty).not().isEmpty(),
    collector,
  ];
};

export { logValid };
