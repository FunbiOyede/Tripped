const tripRouter = require("express").Router();
const tripController = require("../../controllers/trip.controllers");
const { celebrate, Joi, Segments } = require("celebrate");
const auth = require("../../middlewares/auth");
const cacheMiddleware = require("../../middlewares/cacheMiddleware");

//CREATE TRIP
tripRouter.post(
  "/trip",
  [
    celebrate({
      [Segments.BODY]: Joi.object().keys({
        title: Joi.string().required().min(3).max(30),
        startDate: Joi.string().required(),
        endDate: Joi.string().required(),
        location: Joi.string().required().min(5),
      }),
    }),
  ],
  auth.isAuthenticated,
  cacheMiddleware,
  tripController.createTrip
);

// GET ALL TRIPS
tripRouter.get("/trips", auth.isAuthenticated, tripController.allTrips);
//GET  A TRIP
tripRouter.get("/trip/:id", auth.isAuthenticated, tripController.getTrip);
//UPDATE TRIP
tripRouter.post(
  "/trip/:id",
  [
    celebrate({
      [Segments.BODY]: Joi.object().keys({
        title: Joi.string().required().min(3).max(30),

        startDate: Joi.string().required(),
        endDate: Joi.string().required(),
        location: Joi.string().required().min(5),
      }),
    }),
  ],
  auth.isAuthenticated,
  cacheMiddleware,
  tripController.updateTrip
);
//ARCHIVE OR DELETE TRIP
tripRouter.delete("/trip/:id", auth.isAuthenticated, tripController.deleteTrip);
//RESTORE ARCHIVE OR DELETED TRIPS
tripRouter.post(
  "/trip/:id/restore",
  auth.isAuthenticated,
  tripController.restoreDeletedTrip
);
//GET ALL ARCHIVED TRIPS
tripRouter.get(
  "/trips/archives",
  auth.isAuthenticated,
  tripController.getArchivedTrips
);

//WEATHER FOR A TRIP
tripRouter.get("/weather", auth.isAuthenticated, tripController.getWeather);

module.exports = tripRouter;
