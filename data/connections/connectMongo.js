const mongoose = require("mongoose");
const config = require("../../config/index");

const setupDB = () => {
  return new mongoose.connect(config.DB_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
    socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
  });
};

module.exports = { setupDB };
