export const env = {
  port: process.env.PORT ?? 3000,
  domain: process.env.DOMAIN ?? 'localhost',
  mongoUrl: process.env.MONGO_URL ?? 'mongodb://localhost:27017/url-shortener',
};
