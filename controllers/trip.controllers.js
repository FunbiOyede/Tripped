const tripService = require("../services/trip.services"),
  httpStatus = require("http-status-codes"),
  { BadRequestError, NotFoundError } = require("../util/error"),
  BaseController = require("./controller");
const config = require("../config/index");
const httpClient = require("../lib/http/httpClient");
const api_client = new httpClient({
  api_key: config.OPEN_WEATHER_API_KEY,
  url: config.OPEN_WEATHER_URL,
});
class TripControllers extends BaseController {
  async createTrip(req, res, next) {
    try {
      const attr = { ...req.body, userId: req.user.userId };
      const trip = await tripService.createTrip(attr);
      super.reply(
        res,
        httpStatus.CREATED,
        "trip was successfully created",
        trip
      );
    } catch (error) {
      error.statusCode = httpStatus.BAD_REQUEST;
      next(new BadRequestError(error));
    }
  }

  async allTrips(req, res, next) {
    try {
      const { userId } = req.user;
      const result = await tripService.all(userId);
      super.reply(res, httpStatus.OK, "The list of trips", result);
    } catch (error) {
      error.statusCode = httpStatus.BAD_REQUEST;
      next(new BadRequestError(error));
    }
  }

  async getArchivedTrips(req, res, next) {
    try {
      const { userId } = req.user;
      const result = await tripService.allArchives(userId);
      super.reply(res, httpStatus.OK, "The list of trips", result);
    } catch (error) {
      error.statusCode = httpStatus.NOT_FOUND;
      next(new NotFoundError(error));
    }
  }

  async getTrip(req, res, next) {
    const { id } = req.params;
    try {
      const trip = await tripService.getTrip(id);
      super.reply(res, httpStatus.OK, "The requested trip", trip);
    } catch (error) {
      next(error);
    }
  }
  async updateTrip(req, res, next) {
    const { id } = req.params;
    try {
      const trip = await tripService.updateTrip(id, req.body);
      super.reply(
        res,
        httpStatus.OK,
        "The trip was successfully updated",
        trip
      );
    } catch (error) {
      next(error);
    }
  }

  async deleteTrip(req, res, next) {
    const { id } = req.params;
    try {
      const trip = await tripService.deleteTrip(id);
      super.reply(
        res,
        httpStatus.OK,
        "The trip was successfully deleted",
        trip
      );
    } catch (error) {
      next(error);
    }
  }

  async restoreDeletedTrip(req, res, next) {
    const { id } = req.params;
    try {
      const trip = await tripService.restoreTrip(id);
      super.reply(
        res,
        httpStatus.OK,
        "The trip was successfully restored",
        trip
      );
    } catch (error) {
      next(error);
    }
  }

  async getWeather(req, res) {
    try {
      const { location } = req.query;
      const result = await api_client.WeatherForecast({
        q: location.toUpper(),
      });
      super.reply(res, httpStatus.OK, "The requested weather forecast", result);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new TripControllers();
