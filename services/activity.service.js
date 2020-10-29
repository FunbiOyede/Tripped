const { models } = require("mongoose");
const activityRepository = require("../data/repository/activity.respository");

class AcitivityService {
  async createActivity(data) {
    try {
      const activity = await activityRepository.create(data);
      return activity;
    } catch (error) {
      throw error;
    }
  }

  async updateActivity(id, data) {
    try {
      const activity = await activityRepository.update(id, data);
      return activity;
    } catch (error) {
      throw error;
    }
  }

  async getAllActivities() {
    try {
      const activities = await activityRepository.AllActivities();
      return activities;
    } catch (error) {
      throw error;
    }
  }
  async getActivity(id) {
    try {
      const activity = await activityRepository.findActivityById(id);
      if (!activity) {
        throw new NotFoundError("The specified activity was not found");
      }

      return activity;
    } catch (error) {
      throw error;
    }
  }

  async deleteActivity(id) {
    try {
      const activity = await activityRepository.delete(id);
      return activity;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new AcitivityService();
