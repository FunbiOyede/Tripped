const BaseRepository = require("./repository"),
  tripModel = require("../model/Trips");
class ImageRespository extends BaseRepository {
  constructor() {
    super(tripModel);
  }
  async uploadImages(id, key) {
    try {
      const doc = await this.model.findById(id);

      doc.imageKey.push(key);
      return doc.save();
    } catch (error) {
      throw error;
    }
  }
  async deleteImage(id, key) {
    try {
      const doc = await this.model.findById(id);
      const Keys = doc.imageKey;
      for (let index = 0; index < Keys.length; index++) {
        const element = Keys[index];
        if (element == key) {
          Keys.splice(index, 1);
        }
      }
      return doc.save();
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new ImageRespository();
