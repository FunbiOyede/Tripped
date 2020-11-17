const redis = require("redis");
//chane to index
const { logger } = require("../../util/logger");
const config = require("../../config/dev");
const client = redis.createClient(config.REDIS_URL);

const connectRedis = () => {
  client.on("connect", function () {
    logger.info("redis connected");
  });
  client.on("error", function () {
    logger.info("error starting up redis");
  });
  client.on("ready", function () {
    logger.info("redis ready");
  });
};
module.exports = {
  client,
  connectRedis,
};
