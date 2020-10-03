const tripService = require("../services/trip.services"),
  httpStatus = require("http-status-codes"),
  { BadRequestError } = require("../util/error"),
  BaseController = require("./controller");
class TripControllers extends BaseController {
  async createTrip(req, res, next) {
    try {
      const trip = await tripService.create(req.body);
      super.reply(
        res,
        httpStatus.CREATED,
        "trip was successfully created",
        trip
      );
    } catch (error) {
      console.log(error);
      error.statusCode = httpStatus.BAD_REQUEST;
      next(new BadRequestError(error));
    }
  }
}

module.exports = new TripControllers();
