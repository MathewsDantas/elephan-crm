import express from 'express';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

import authRoutes from './routes/authRoutes';
import pipelineRoutes from './routes/pipelineRoutes';
import contactRoutes from './routes/contactRoutes';

const app = express();

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

export default app;
