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
      if (trips.length === 0) {
        throw new NotFoundError("No trips where found");
      }
      return trips;
    } catch (error) {
      throw error;
    }
  }

  async allArchives(userId) {
    try {
      const trips = await tripRepository.allArchivedTrips(userId);
      if (trips.length === 0) {
        throw new NotFoundError("No archived trips where found");
      }
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
      if (!trip) {
        throw new NotFoundError("The specified trip was not found");
      }
      return trip;
    } catch (error) {
      throw error;
    }
  }

  async deleteTrip(id) {
    try {
      const trip = await tripRepository.archive(id);
      if (!trip) {
        throw new NotFoundError("The specified trip does not exits");
      }
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
