const router = require("express").Router();
const tripController = require("../../controllers/trip.controllers");
const { celebrate, Joi, Segments } = require("celebrate");

router.post(
  "/trip",
  [
    celebrate({
      [Segments.BODY]: Joi.object().keys({
        title: Joi.string().required().min(3).max(30),

        startDate: Joi.string().required(),
        endDate: Joi.string().required(),
        location: Joi.string().required().min(5),
        userId: Joi.string(),
      }),
    }),
  ],
  tripController.createTrip
);
router.get("/trips", tripController.getTrips);
router.get("/trip/:id", tripController.getTrip);
router.post(
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
  tripController.updateTrip
);
router.delete("/trip/:id", tripController.deleteTrip);

module.exports = router;
