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

  async all() {
    try {
      return await this.model.find().sort({ createdAt: "ascending" }).lean();
    } catch (error) {
      throw error;
    }
  }

  async getById(id) {
    return await this.model.findById(id).lean();
  }

  async update(id, data) {
    try {
      return await this.model.findByIdAndUpdate(id, data, { new: true });
    } catch (error) {
      throw error;
    }
  }

  async delete(id) {
    try {
      return await this.model.findByIdAndRemove(id);
    } catch (error) {
      throw error;
    }
  }
}

module.exports = BaseRepository;
