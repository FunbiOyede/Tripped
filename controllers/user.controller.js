const { models } = require("mongoose");
const userService = require("../services/user.service"),
  httpStatus = require("http-status-codes"),
  BaseController = require("./controller"),
  { BadRequestError } = require("../util/error");
const axios = require("axios");

class UserController extends BaseController {
  async createUser(req, res, next) {
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

    try {
      const user = await userService.createUser({ name, email });
      super.reply(res, httpStatus.CREATED, "user successfully created", user);
    } catch (error) {
      error.statusCode = httpStatus.BAD_REQUEST;
      next(new BadRequestError(error));
    }
  }
}

module.exports = new UserController();
