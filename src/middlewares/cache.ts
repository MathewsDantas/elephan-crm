import { Request, Response, NextFunction } from 'express';

import redisClient, { ensureRedisConnection } from '../config/redisClient';
import config from '../config/config';

export const cacheMiddleware = (
  key: string,
  expiration = config.CACHE_EXPIRATION
) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log('Cache Middleware');
      // Garantir que o Redis esteja conectado
      await ensureRedisConnection();

      const cachedData = await redisClient.get(key);
      console.log('Cache Middleware', cachedData);

      if (cachedData) {
        // Retorna a resposta em cache se disponível
        return res.json(JSON.parse(cachedData));
      }

      // Sobrescreve a função `res.json` para armazenar a resposta no cache
      const originalJson = res.json.bind(res);
      res.json = (body) => {
        redisClient.setEx(key, Number(expiration), JSON.stringify(body)); // Armazena no cache
        return originalJson(body); // Retorna a resposta original
      };

      next();
    } catch (err) {
      console.error('Erro no Redis:', err);
      next(); // Continua o processamento se houver um erro
    }
  };
};
