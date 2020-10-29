const router = require("express").Router();
const tripController = require("../../controllers/trip.controllers");
const { celebrate, Joi, Segments } = require("celebrate");
const budgetController = require("../../controllers/budget.controller");
const cacheMiddleware = require("../../middlewares/cacheMiddleware");
const acitivityController = require("../../controllers/activity.controller");
//create trips
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
  cacheMiddleware,
  tripController.createTrip
);
router.get("/trips", tripController.allTrips);
router.get("/trip/:id", tripController.getTrip);
//update trip
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
  cacheMiddleware,
  tripController.updateTrip
);
router.delete("/trip/:id", tripController.deleteTrip);
//restore deleted trip
router.post("/trip/:id/restore", tripController.restoreDeletedTrip);
router.get("/trips/archives", tripController.getArchivedTrips);

///////////////////////////////////////////////Budgets
//create
router.post(
  "/budget",
  [
    celebrate({
      [Segments.BODY]: Joi.object().keys({
        amount: Joi.number().required(),
        currency: Joi.string().required(),
        trip: Joi.string().required(),
        userId: Joi.string().required(),
      }),
    }),
  ],
  budgetController.createBudget
);

//get a budget
router.get("/budget/:id", budgetController.getBudget);
//////////////update budget
router.post(
  "/budget/:id",
  [
    celebrate({
      [Segments.BODY]: Joi.object().keys({
        amount: Joi.number().required(),
        currency: Joi.string(),
      }),
    }),
  ],
  budgetController.updateBudget
);
router.get("/budgets", budgetController.allBudgets);
//delete a budget
router.delete("/budget/:id", budgetController.deleteBudget);
router.get("/weather", tripController.getWeather);

////////////////////////acitivities
//all activities
router.get("/activities", acitivityController.getAllActivities);
// get activity
router.get("/activity/:id", acitivityController.getActivity);
//create activity
router.post(
  "/activity",
  [
    celebrate({
      [Segments.BODY]: Joi.object().keys({
        place: Joi.string().required(),
        address: Joi.string().required(),
        time: Joi.string().required(),
        date: Joi.string().required(),
        trip: Joi.string().required(),
        userId: Joi.string().required(),
      }),
    }),
  ],
  acitivityController.createActivity
);
//update activity
router.post("/activity/:id", acitivityController.updateActivity);
//delete acitivity
router.delete("/activity/:id", acitivityController.deleteActivity);
module.exports = router;
