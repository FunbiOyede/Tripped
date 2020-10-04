const mongoose = require("mongoose");
const config = require("../../config/index");
const setupDB = () => {
  return new mongoose.connect(config.DB_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  });
};

module.exports = { setupDB };