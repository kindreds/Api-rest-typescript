import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import express, { Application } from 'express';

import logging from './helpers/logging';
import authRouter from './routes/auth.routes';

import { dbConnection } from './database/database';
import eventRouter from './routes/events.routes';

const app: Application = express();

/** DB Connection */
dbConnection();

/** Set Cors */
app.use(cors());
/** Set Helmet */
app.use(helmet());
/** Set Morgan */
app.use(morgan('dev'));
/** Set parse JSON */
app.use(express.json());

/** Routes */
app.use('/api/auth', authRouter);
app.use('/api/event', eventRouter);

/** Server settings */
app.set('port', process.env.PORT || 1337);

/** Listen */
app.listen(app.get('port'), () => {
  logging.info('Server', `Server Running on port ${app.get('port')}`);
});
