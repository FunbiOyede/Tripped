const BaseRepository = require("./repository"),
  tripModel = require("../model/Trips");
class TripRepository extends BaseRepository {
  constructor() {
    super(tripModel);
  }

  async allTrips() {
    try {
      return await this.model
        .find({ deleted: false })
        .cache()
        .sort({ createdAt: "ascending" })
        .lean();
    } catch (error) {
      throw error;
    }
  }

  async allArchivedTrips() {
    try {
      return await this.model
        .find({ deleted: true })
        .sort({ createdAt: "ascending" })
        .lean();
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new TripRepository();
