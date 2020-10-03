const tripRepository = require("../data/repository/trip.repository");

class TripServices {
  async create(data) {
    try {
      const trip = await tripRepository.create(data);
      return trip;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new TripServices();
