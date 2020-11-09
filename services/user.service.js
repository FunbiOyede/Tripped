const userRepository = require("../data/repository/user.repository");

class UserService {
  async createUser(data) {
    try {
      const user = await userRepository.create(data);
      return user;
    } catch (error) {
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
