const tripRepository = require("../data/repository/trip.repository");
const { TripNotFoundError, NotFoundError } = require("../util/error");
const { calculateDateDifference } = require("../util/index");
const promisify = require("util").promisify;
const { client } = require("../data/connections/connectRedis");

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

  async all() {
    try {
      // client.get = promisify(client.get);
      // const cachedTrips = await client.get("trip");
      // if (cachedTrips) {
      //   return JSON.parse(cachedTrips);
      // }
      // const trips = await tripRepository.all();
      // client.set("trip", JSON.stringify(trips));
      const trips = await tripRepository.allTrips();
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
      const trip = await tripRepository.delete(id);
      return trip;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new TripServices();
