const BaseRepository = require("./repository"),
  tripModel = require("../model/Trips");
class TripRepository extends BaseRepository {
  constructor() {
    super(tripModel);
  }

  async allTrips() {
    try {
      return await this.model
        .find()
        .cache()
        .sort({ createdAt: "ascending" })
        .lean();
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new TripRepository();
