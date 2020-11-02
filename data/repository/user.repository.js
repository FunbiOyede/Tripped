const BaseRepository = require("./repository"),
  userModel = require("../model/User");
class UserRepository extends BaseRepository {
  constructor() {
    super(userModel);
  }
}

module.exports = new UserRepository();
