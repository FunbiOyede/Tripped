require("dotenv").config();
process.env.NODE_ENV = "production";
module.exports = {
  DB_URL: process.env.PRODUCTION_DB_URL,
  PORT: parseInt(process.env.PORT, 10),
  OPEN_WEATHER_API_KEY: process.env.OPEN_WEATHER_API_KEY,
  OPEN_WEATHER_URL: process.env.OPEN_WEATHER_URL,
};
