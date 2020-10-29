const httpStatus = require("http-status-codes"),
  BaseController = require("./controller"),
  activityServices = require("../services/activity.service");

class ActivityController extends BaseController {
  async createActivity(req, res, next) {
    try {
      const activity = await activityServices.createActivity(req.body);
      super.reply(
        res,
        httpStatus.CREATED,
        "The activity was successfully created",
        activity
      );
    } catch (error) {
      next(error);
    }
  }
  async updateActivity(req, res, next) {
    const { id } = req.params;

    try {
      const activity = await activityServices.updateActivity(id, req.body);
      super.reply(
        res,
        httpStatus.OK,
        "The activity was successfully updated",
        activity
      );
    } catch (error) {
      next(error);
    }
  }
  async deleteActivity(req, res, next) {
    const { id } = req.params;

    try {
      const activity = await activityServices.deleteActivity(id);
      super.reply(
        res,
        httpStatus.OK,
        "The activity was successfully deleted",
        activity
      );
    } catch (error) {
      next(error);
    }
  }
  async getActivity(req, res, next) {
    const { id } = req.params;
    try {
      const activity = await activityServices.getActivity(id);
      super.reply(res, httpStatus.OK, "The requested activity 🎉", activity);
    } catch (error) {
      next(error);
    }
  }
  async getAllActivities(req, res, next) {
    try {
      const activities = await activityServices.getAllActivities();
      super.reply(res, httpStatus.OK, "The list of activities", activities);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new ActivityController();
