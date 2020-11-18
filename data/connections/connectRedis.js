const redis = require("redis");
//chane to index
const { logger } = require("../../util/logger");
const config = require("../../config/dev");
const client = redis.createClient(config.REDIS_URL);

const connectRedis = () => {
  client.on("connect", function () {
    logger.info(`redis connected in ${process.env.NODE_ENV} enviroment`);
  });
  client.on("error", function () {
    logger.info("error starting up redis");
  });
  client.on("ready", function () {
    logger.info("redis ready");
  });
};

const closeRedis = () => client.quit();
module.exports = {
  client,
  connectRedis,
  closeRedis,
};
