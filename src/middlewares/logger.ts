import { Request, Response, NextFunction } from 'express';
import { createLogger, format, transports } from 'winston';

export const logger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.printf(
      ({ level, message, timestamp }) => `${timestamp} ${level}: ${message}`
    )
  ),
  transports: [
    new transports.Console(),
    new transports.File({ filename: 'logs/app.log' }),
  ],
});

export const requestLogger = (
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
