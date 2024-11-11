import { createClient } from 'redis';

import config from './config';

const redisClient = createClient({
  url: config.REDIS_URL,
});

redisClient.on('connect', () => {
  console.log('Conectado ao Redis');
});

redisClient.on('error', (err) => {
  console.log('Erro ao conectar ao Redis: ' + err);
});

// Função para garantir que o cliente está conectado antes de usá-lo
export const ensureRedisConnection = async () => {
  if (!redisClient.isOpen) {
    await redisClient.connect();
  }
};

export default redisClient;
