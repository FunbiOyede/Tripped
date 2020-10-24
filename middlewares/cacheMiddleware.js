const { clearCache } = require("../data/repository/cache");

const cacheMiddleware = async (req, res, next) => {
  await next();
  clearCache();
};

module.exports = cacheMiddleware;
