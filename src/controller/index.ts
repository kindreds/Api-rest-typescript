import { logControl } from './auth/logControl';
import { regControl } from './auth/regControl';
import { rewControl } from './auth/rewControl';

import { allControl } from './event/allControl';
import { getControl } from './event/getControl';
import { newControl } from './event/newControl';
import { editControl } from './event/editControl';
import { deleteControl } from './event/deleteControl';

export {
  // auth
  logControl,
  regControl,
  rewControl,
  // events
  getControl,
  allControl,
  newControl,
  editControl,
  deleteControl,
};
