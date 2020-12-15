const BaseRepository = require("./repository"),
  tripModel = require("../model/Trips");
class TripRepository extends BaseRepository {
  constructor() {
    super(tripModel);
  }

  async allTrips(userId) {
    try {
      return await this.model
        .find({ userId, deleted: false })
        .cache({ key: userId })
        .sort({ createdAt: "ascending" })
        .lean();
    } catch (error) {
      throw error;
    }
  }

  async allArchivedTrips(userId) {
    try {
      return await this.model
        .find({ userId, deleted: true })
        .sort({ createdAt: "ascending" })
        .lean();
    } catch (error) {
      throw error;
    }
  }

  async uploadImages(id, url) {
    try {
      const doc = await this.model.findById(id);
      doc.imageUrl = url;
      return doc.save();
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new TripRepository();
