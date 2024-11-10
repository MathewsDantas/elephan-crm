import 'express-async-errors';
import express from 'express';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

import authRoutes from './routes/authRoutes';
import pipelineRoutes from './routes/pipelineRoutes';
import contactRoutes from './routes/contactRoutes';
import { requestLoggerMiddleware } from './middlewares/logger';
import { errorMiddleware } from './middlewares/error';
import { ApiError } from './helpers/api-erros';

const app = express();

app.use(requestLoggerMiddleware); // Middleware para logar as requisições

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'CRM API - Ploomes',
      version: '1.0.0',
      description: 'Integração com Ploomes',
    },
    servers: [
      {
        url: 'http://localhost:3000/api/v1',
      },
    ],
  },
  apis: ['./src/routes/*.ts'],
};
const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

const apiUrl = '/api/v1';
app.use(apiUrl, express.json());
app.use(apiUrl, authRoutes);
app.use(apiUrl, pipelineRoutes);
app.use(apiUrl, contactRoutes);

app.use(
  (
    err: ApiError,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    errorMiddleware(err, req, res, next);
  }
); // Middleware para tratar erros

export default app;
