require("dotenv").config();

if (process.env.NODE_ENV === "production") {
  module.exports = require("./prod");
} else if (process.env.NODE_ENV === "test") {
  module.exports = require("./test");
} else if (process.env.NODE_ENV === "development") {
  module.exports = require("./dev");
} else if (process.env.NODE_ENV === "ci") {
  module.exports = require("./dev");
} else if (process.env.NODE_ENV === "ci_test") {
  module.exports = require("./ci");
}

// config.js
