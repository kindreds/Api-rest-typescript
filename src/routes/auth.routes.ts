import { Router } from 'express';

import { logValid, regValid } from '../validators';
import { logMiddle, tokenMiddle } from '../middleware';
import { logControl, regControl, rewControl } from '../controller';

const authRouter = Router();

authRouter.post('/login', logValid(), logMiddle, logControl);
authRouter.post('/register', regValid(), regControl);
authRouter.get('/renew', tokenMiddle, rewControl);

export default authRouter;
