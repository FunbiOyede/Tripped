const tripRepository = require("../data/repository/trip.repository");
const { TripNotFoundError, NotFoundError } = require("../util/error");
class TripServices {
  async createTrip(data) {
    try {
      const trip = await tripRepository.create(data);
      return trip;
    } catch (error) {
      throw error;
    }
  }

  async all() {
    try {
      return await tripRepository.all();
    } catch (error) {
      throw error;
    }
  }

  async getTrip(id) {
    try {
      const trip = await tripRepository.getById(id);
      if (!trip) {
        throw new NotFoundError("The specified trip was not found");
      }

      return trip;
    } catch (error) {
      throw error;
    }
  }

  async updateTrip(id, data) {
    try {
      const trip = await tripRepository.update(id, data);
      return trip;
    } catch (error) {
      throw error;
    }
  }

  async deleteTrip(id) {
    try {
      const trip = await tripRepository.delete(id);
      return trip;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new TripServices();
