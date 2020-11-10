const router = require("express").Router();
const tripController = require("../../controllers/trip.controllers");
const { celebrate, Joi, Segments } = require("celebrate");
const budgetController = require("../../controllers/budget.controller");
const cacheMiddleware = require("../../middlewares/cacheMiddleware");
const acitivityController = require("../../controllers/activity.controller");
const config = require("../../config/index");
const { googleLoginUrl } = require("../../util/google");
const userController = require("../../controllers/user.controller");

const auth = require("../../middlewares/auth");
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
      }),
    }),
  ],
  auth.isAuthenticated,
  cacheMiddleware,
  tripController.createTrip
);
router.get("/trips", auth.isAuthenticated, tripController.allTrips);
router.get("/trip/:id", auth.isAuthenticated, tripController.getTrip);
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
  auth.isAuthenticated,
  cacheMiddleware,
  tripController.updateTrip
);
//archive trip
router.delete("/trip/:id", auth.isAuthenticated, tripController.deleteTrip);
//restore deleted/archived trip
router.post(
  "/trip/:id/restore",
  auth.isAuthenticated,
  tripController.restoreDeletedTrip
);
router.get(
  "/trips/archives",
  auth.isAuthenticated,
  tripController.getArchivedTrips
);

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

//google auth
// router.post("/authenticate/google", (req, res, next) => {
//   console.log(googleLoginUrl);
// });
// router.get("/auth/google/callback", async (req, res, next) => {
//   const { code } = req.query;
//   console.log(code);
//   const { data } = await axios({
//     url: `https://oauth2.googleapis.com/token`,
//     method: "post",
//     data: {
//       client_id: config.GOOGLE_CLIENT_ID,
//       client_secret: config.GOOGLE_SECRET_ID,
//       redirect_uri: "http://localhost:3000/auth/google/callback",
//       grant_type: "authorization_code",
//       code,
//     },
//   });
//   console.log(data);

//   const payload = await axios({
//     url: "https://www.googleapis.com/oauth2/v2/userinfo",
//     method: "get",
//     headers: {
//       Authorization: `Bearer ${data.access_token}`,
//     },
//   });
//   console.log(payload);
// });

router.post("/google", userController.createUser);
router.get("/user", auth.isAuthenticated, userController.getUser);

module.exports = router;
