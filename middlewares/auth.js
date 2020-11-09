const userRepository = require("../data/repository/user.repository");
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
      const { _id } = await userRepository.find({ email: payload.email });

      req.user = {
        email: payload.email,
        userId: _id,
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
