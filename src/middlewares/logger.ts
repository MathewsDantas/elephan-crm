import { Request, Response, NextFunction } from 'express';
import { logger } from '../config/logger';

export const requestLoggerMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.on('finish', () => {
    // finish é um evento que ocorre quando a resposta é enviada
    logger.info(`${req.method} ${req.path} status: ${res.statusCode}`);
  });
  next();
};
