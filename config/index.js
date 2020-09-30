require("dotenv").config();
module.exports = {
  DB_URL: process.env.DATABASE_URL,
  PORT: process.env.PORT,
};
