import { Response } from 'express';
import redisClient, { ensureRedisConnection } from '../config/redisClient';
import config from '../config/config';

export const cacheData = async (
  key: string,
  res: Response,
  callback: Function,
  expiration: string | number = config.CACHE_EXPIRATION
) => {
  await ensureRedisConnection(); // Garante que a conexão com o Redis está estabelecida

  const cachedData = await redisClient.get(key);
  console.log('cachedData: ', cachedData);
  if (cachedData) {
    // Se houver dados em cache, retorna os dados em cache
    console.log('Cache encontrado');
    return res.json(JSON.parse(cachedData));
  }

  // Caso contrário, executa a função de callback e armazena o resultado no cache
  const data = await callback();

  // Armazena os dados no Redis com a expiração configurada
  redisClient.setEx(key, Number(expiration), JSON.stringify(data));

  return res.json(data); // Retorna a resposta normal
};
