import { check, ValidationChain } from 'express-validator';
import { collector } from '../../middleware';
import { eventType } from '../../types/types';

const eventValid = (): Array<ValidationChain | collector> => {
  const { title, important, complete } = eventType;

  const isBool = (v: boolean) => typeof v === 'boolean';

  return [
    /** Title */
    check('title', title.empty).not().isEmpty(),
    /** Important */
    check('important', important.empty).not().isEmpty(),
    check('important', important.invalid).custom(isBool),
    /** Important */
    check('complete', complete.empty).not().isEmpty(),
    check('complete', complete.invalid).custom(isBool),
    collector,
  ];
};

export { eventValid };
