require("dotenv").config();

module.exports = {
  DB_URL: process.env.PRODUCTION_DB_URL,
  PORT: parseInt(process.env.PROD_PORT, 10),
  REDIS_URL: process.env.REDIS_URL_PRODUCTION,
  REDIS_PRODUCTION_PASSWORD: process.env.REDIS_PRODUCTION_PASSWORD,
  OPEN_WEATHER_API_KEY: process.env.OPEN_WEATHER_API_KEY,
  OPEN_WEATHER_URL: process.env.OPEN_WEATHER_URL,
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  GOOGLE_SECRET_ID: process.env.GOOGLE_SECRET_ID,
  ACCESS_TOKEN: process.env.ACCESS_TOKEN,
  REFRESH_TOKEN: process.env.REFRESH_TOKEN,
  S3_ACCESS_KEY_ID: process.env.S3_ACCESS_KEY_ID,
  S3_SECRET_KEY: process.env.S3_SECRET_KEY,
  S3_BUCKET_NAME: process.env.S3_BUCKET_NAME,
};
