const userService = require("../services/user.service"),
  httpStatus = require("http-status-codes"),
  BaseController = require("./controller"),
  { BadRequestError } = require("../util/error");
const jwt = require("../util/jwt");
const axios = require("axios");
const { config } = require("winston");

class UserController extends BaseController {
  async createUser(req, res, next) {
    try {
      const { token } = req.body;

      // Sends the tokenId to the Google API to get  the payload, which conatins the user's email
      const { data } = await axios({
        url: "https://www.googleapis.com/oauth2/v2/userinfo",
        method: "get",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const { name, email } = data;
      const user = await userService.createUser({ name, email });
      const accessToken = await jwt.generateAccessToken(user);
      super.reply(res, httpStatus.CREATED, "user successfully created", {
        user,
        accessToken,
      });
    } catch (error) {
      error.statusCode = httpStatus.BAD_REQUEST;
      next(new BadRequestError(error));
    }
  }

  async getUser(req, res, next) {
    try {
      const user = await userService.getUser(req.user.email);
      super.reply(res, httpStatus.OK, "The requested user", user);
    } catch (error) {
      error.statusCode = httpStatus.UNAUTHORIZED;
      next(new BadRequestError(error));
    }
  }
}

module.exports = new UserController();
