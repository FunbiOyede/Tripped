const redis = require("redis");
const { logger } = require("../../util/logger");
const config = require("../../config/index");
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

const closeRedis = () => {
  return async function shutdown() {
    await new Promise((resolve) => {
      redis.quit(() => {
        resolve();
      });
    });
    // redis.quit() creates a thread to close the connection.
    // We wait until all threads have been run once to ensure the connection closes.
    await new Promise((resolve) => setImmediate(resolve));
  };
};
module.exports = {
  client,
  connectRedis,
  closeRedis,
};
