import cors from 'cors';

import config from './config/config';
import app from './app';
import { logger } from './config/logger';

const corsOptions = {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));

app.listen(config.PORT, () => {
  logger.info(`Server está rodando em http://localhost:${config.PORT}`);
});
