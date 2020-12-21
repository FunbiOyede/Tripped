const userService = require("../services/user.service"),
  httpStatus = require("http-status-codes"),
  BaseController = require("./controller"),
  { BadRequestError, GoogleAuthError } = require("../util/error");
const jwt = require("../util/jwt");
const axios = require("axios");

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
      const refreshToken = await jwt.generateRefreshToken(user);
      super.reply(res, httpStatus.CREATED, "user successfully created", {
        user,
        accessToken,
        refreshToken,
      });
    } catch (error) {
      // console.log(error.response.status, error.response.statusText);
      error.statusCode = httpStatus.UNAUTHORIZED;
      next(new GoogleAuthError(error));
    }
  }

  async login(req, res, next) {
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

      const user = await userService.authenticateUserByEmail(email);
      const accessToken = await jwt.generateAccessToken(user);
      const refreshToken = await jwt.generateRefreshToken(user);
      super.reply(res, httpStatus.OK, "login successful", {
        user,
        accessToken,
        refreshToken,
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
  async getRefreshToken(req, res, next) {
    try {
      const { token } = req.body;
      const user = await jwt.decyptTokens(token, "refresh");
      const accessToken = await jwt.generateAccessToken(user.email);
      const refreshToken = await jwt.generateRefreshToken(user.email);
      super.reply(res, httpStatus.CREATED, "user successfully created", {
        accessToken,
        refreshToken,
      });
    } catch (error) {
      error.statusCode = httpStatus.BAD_REQUEST;
      next(new BadRequestError(error));
    }
  }
}

module.exports = new UserController();
