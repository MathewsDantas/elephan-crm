
import config from './config/config';
import app from './app';
import { logger } from './config/logger';

app.listen(config.PORT, () => {
  logger.info(`Server está rodando em http://localhost:${config.PORT}`);
});
