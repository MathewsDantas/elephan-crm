import config from './config';
import app from './app';

app.listen(config.PORT, () => {
  console.log(`Server está rodando em http://localhost:${config.PORT}`);
});
