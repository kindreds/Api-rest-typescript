import mongoose from 'mongoose';
import logging from '../helpers/logging';

export const dbConnection = async (): Promise<void> => {
  const URI = process.env.DB_CONNECTION ?? 'VARIABLE NO RECIBIDA';

  try {
    await mongoose.connect(URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });

    logging.info('DB', 'DB online');
  } catch (error) {
    logging.error('DB', `Error: ${error}`);
    // throw new Error('Error connecting to database');
  }
};
