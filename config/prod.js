require("dotenv").config();

module.exports = {
  DB_URL: process.env.PRODUCTION_DB_URL,
  // PORT: parseInt(process.env.PROD_PORT, 10),
  //change to prod(heroku add on)
  REDIS_URL: process.env.REDIS_URL,
  OPEN_WEATHER_API_KEY: process.env.OPEN_WEATHER_API_KEY,
  OPEN_WEATHER_URL: process.env.OPEN_WEATHER_URL,
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  GOOGLE_SECRET_ID: process.env.GOOGLE_SECRET_ID,
  ACCESS_TOKEN: process.env.ACCESS_TOKEN,
  REFRESH_TOKEN: process.env.REFRESH_TOKEN,
  //REDIS DEPLOYMENT
};
