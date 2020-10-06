require("dotenv").config();
process.env.NODE_ENV = process.env.NODE_ENV || "production";
module.exports = {
  DB_URL: process.env.PRODUCTION_DB_URL,
};
