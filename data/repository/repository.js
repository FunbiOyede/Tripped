const BaseController = require("../../controllers/controller");

class BaseRepository {
  constructor(model) {
    this.model = model;
  }

  async create(body) {
    try {
      const document = await this.model.create(body);
      return document;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = BaseRepository;
