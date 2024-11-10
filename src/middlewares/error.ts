import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../helpers/api-erros';
import axios from 'axios';

export const errorMiddleware = (
  err: Partial<ApiError> | Error,
  req: Request,
  res: Response,
  next: NextFunction
): Response => {
  if (err instanceof ApiError) {
    console.log('api error', err.message);
    return res.status(err.statusCode).json({
      statusCode: err.statusCode,
      message: err.message,
    });
  }

  if (axios.isAxiosError(err) && err.response) {
    console.log('axios error', err.response.status);
    return res.status(err.response.status).json({
      statusCode: err.response.status,
      message: 'Erro ao chamar API externa',
    });
  }

  return res.status(500).json({
    statusCode: 500,
    message: 'Internal Server Error',
  });
};
