import dotenv from 'dotenv';
dotenv.config(); 

const config = {
  CRM_API_URL: process.env.CRM_API_URL,
  CACHE_EXPIRATION: 300, // em segundos (5 minutos)
  PORT: process.env.PORT || 3000,
  CRM_API_KEY: process.env.CRM_API_KEY,
};

export default config;
