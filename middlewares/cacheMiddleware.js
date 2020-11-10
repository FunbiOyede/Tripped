const { clearCache } = require("../data/repository/cache");

const cacheMiddleware = async (req, res, next) => {
  await next();
  const { userId } = req.user;
  clearCache(userId);
};

module.exports = cacheMiddleware;
