import config from './config';
import app from './app';
import { logger } from './logger';

app.listen(config.PORT, () => {
  logger.info(`Server está rodando em http://localhost:${config.PORT}`);
});
