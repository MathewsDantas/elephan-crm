const config = {
  CRM_API_URL: process.env.CRM_API_URL || 'https://api.fakecompany.com',
  CACHE_EXPIRATION: 300, // em segundos (5 minutos)
  PORT: process.env.PORT || 3000,
};

export default config;