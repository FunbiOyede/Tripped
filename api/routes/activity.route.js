const auth = require("../../middlewares/auth");
const { celebrate, Joi, Segments } = require("celebrate");
const acitivityController = require("../../controllers/activity.controller");
const activityRouter = require("express").Router();
//ALL ACTIVITIES
activityRouter.get(
  "/activities",
  auth.isAuthenticated,
  acitivityController.getAllActivities
);
// GET AN ACTIVITY
activityRouter.get(
  "/activity/:id",
  auth.isAuthenticated,
  acitivityController.getActivity
);
//CREATE ACTIVITY
activityRouter.post(
  "/activity",
  [
    celebrate({
      [Segments.BODY]: Joi.object().keys({
        place: Joi.string().required(),
        address: Joi.string().required(),
        time: Joi.string().required(),
        date: Joi.string().required(),
        trip: Joi.string().required(),
      }),
    }),
  ],
  auth.isAuthenticated,
  acitivityController.createActivity
);
//UPDATE ACTIVITY
activityRouter.post(
  "/activity/:id",
  auth.isAuthenticated,
  acitivityController.updateActivity
);
//DELETE ACTIVITY
activityRouter.delete(
  "/activity/:id",
  auth.isAuthenticated,
  acitivityController.deleteActivity
);

module.exports = activityRouter;
