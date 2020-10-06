require("dotenv").config();
process.env.NODE_ENV = process.env.NODE_ENV || "development";
module.exports = {
  DB_URL: process.env.DATABASE_URL,
  PORT: process.env.PORT,
};
