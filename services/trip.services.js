const tripRepository = require("../data/repository/trip.repository");
const { TripNotFoundError, NotFoundError } = require("../util/error");
const { calculateDateDifference } = require("../util/index");

class TripServices {
  async createTrip(data) {
    try {
      data.numberOfDays = calculateDateDifference(data.startDate, data.endDate);
      const trip = await tripRepository.create(data);
      return trip;
    } catch (error) {
      throw error;
    }
  }

  async all(userId) {
    try {
      const trips = await tripRepository.allTrips(userId);
      return trips;
    } catch (error) {
      throw error;
    }
  }

  async allArchives() {
    try {
      const trips = await tripRepository.allArchivedTrips();
      return trips;
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
      const trip = await tripRepository.archive(id);
      return trip;
    } catch (error) {
      throw error;
    }
  }
  async restoreTrip(id) {
    try {
      const trip = await tripRepository.restore(id);
      return trip;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new TripServices();
