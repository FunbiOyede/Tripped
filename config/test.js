require("dotenv").config();
module.exports = {
  TEST_DB_URL: process.env.TEST_DB_URL,
  ACCESS_TOKEN: process.env.ACCESS_TOKEN,
  REFRESH_TOKEN: process.env.REFRESH_TOKEN,
  REDIS_URL: process.env.REDIS_URL,
  S3_BUCKET_NAME: "blah-blah-blah",
  DB_CONFIG: {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
    socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
  },
};
