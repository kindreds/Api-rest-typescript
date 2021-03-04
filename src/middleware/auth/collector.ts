import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';

type collector = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<void | Response>;

const collector = async (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  // Validara si hay algun error con los campos
  if (!errors.isEmpty()) {
    return res.status(401).json({
      ok: false,
      errors: errors.mapped(),
    });
  }

  next();
};

export { collector };
