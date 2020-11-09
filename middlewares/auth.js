const { models } = require("mongoose");
const jwt = require("../util/jwt");

class Authorization {
  async isAuthenticated(req, res, next) {
    const { token } = req.headers;
    if (!token) {
      res.status(401).json({
        type: "MissingAuthorizationError",
        message: "Missing token header. Unable to authenticate request",
      });

      return;
    }

    try {
      const payload = await jwt.decyptTokens(token);
      req.user = {
        email: payload.email,
      };
      next();
    } catch (error) {
      res.status(401).json({
        error: error.message,
      });
    }
  }
}

module.exports = new Authorization();
