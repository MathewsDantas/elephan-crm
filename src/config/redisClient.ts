import { createClient } from 'redis';

const redisClient = createClient({
  url: `redis://red-csoitc68ii6s73963kv0:6379`,
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
