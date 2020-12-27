const imageRespository = require("../data/repository/image.repository");
const { NotFoundError } = require("../util/error");

class ImageServices {
  async uploadImages(id, key) {
    try {
      const trip = await imageRespository.uploadImages(id, key);
      return trip;
    } catch (error) {
      throw error;
    }
  }

  async deleteImage(id, key) {
    try {
      const trip = await imageRespository.deleteImage(id, key);
      return trip;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new ImageServices();
