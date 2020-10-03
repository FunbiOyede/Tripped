const BaseRepository = require("./repository"),
  tripModel = require("../model/Trips");
class TripRepository extends BaseRepository {
  constructor() {
    super(tripModel);
  }
}

module.exports = new TripRepository();
