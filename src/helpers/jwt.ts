import jwt from 'jsonwebtoken';
import logging from './logging';
import ms from 'ms';

const expiredIn = ms('30m');

interface Token {
  token: string | undefined;
  expiredAt: number;
}

const genJWT = (payload: string | object): Promise<Token> =>
  new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      process.env.SECRET_JWT || 'testtoken',
      { expiresIn: '30m' },
      (error, token) => {
        if (error) {
          logging.error('GEN JWT', `Error: ${error}`);
          reject('No se ha podido generar el token');
        }
        const expiredAt = +new Date() + expiredIn;

        resolve({ token, expiredAt });
      }
    );
  });

export { genJWT };
