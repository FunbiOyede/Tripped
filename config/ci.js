require("dotenv").config();
module.exports = {
  TEST_DB_URL: "mongodb://127.0.0.1:27017/TestTripped",
  ACCESS_TOKEN: "trippedAcessToken",
  REFRESH_TOKEN: "trippedRefreshToken",
  REDIS_URL: process.env.REDIS_URL,
  DB_CONFIG: {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
    socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
  },
};
