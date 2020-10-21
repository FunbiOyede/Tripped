const redis = require("redis");
//chane to index
const config = require("../../config/dev");
const client = redis.createClient(config.REDIS_URL);

const connectRedis = () => {
  client.on("connect", function () {
    console.log("redis connected");
  });
  client.on("error", function () {
    console.log("error starting up redis");
  });
  client.on("ready", function () {
    console.log("redis ready");
  });
};
module.exports = {
  client,
  connectRedis,
};
