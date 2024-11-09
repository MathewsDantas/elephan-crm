import { Router } from 'express';

import AuthController from '../controllers/authController';

const authRoutes = Router();

authRoutes.post('/auth', new AuthController().connectCRM);

export default authRoutes;
