const userRepository = require("../data/repository/user.repository");
const { NotFoundError } = require("../util/error");
class UserService {
  async createUser(data) {
    try {
      const { email } = data;
      if (await userRepository.find({ email })) {
        throw new NotFoundError("user exists already");
      }
      const user = await userRepository.create(data);
      return user;
    } catch (error) {
      throw error;
    }
  }

  async authenticateUserByEmail(email) {
    try {
      const user = await userRepository.find({ email });
      if (!user) {
        throw new NotFoundError("No account found for email address.");
      }

      return user;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  async getUser(email) {
    try {
      const user = await userRepository.find({ email });
      return user;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new UserService();
