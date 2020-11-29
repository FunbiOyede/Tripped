require("dotenv").config();

if (process.env.NODE_ENV === "production") {
  module.exports = require("./prod");
} else if (process.env.NODE_ENV === "development") {
  module.exports = require("./dev");
}

// config.js
