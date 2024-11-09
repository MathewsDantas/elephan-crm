import { Router } from 'express';

import AuthController from '../controllers/authController';

const authRoutes = Router();

/**
 * @swagger
 * /auth:
 *  post:
 *   description: Conecta com o CRM
 *  parameters:
 *    - in: query
 *      name: apiKey
 *      required: true
 *  responses:
 *  200:
 *  description: Retorna "Hello, world!"
 * */
authRoutes.post('/auth', new AuthController().connectCRM);

export default authRoutes;
