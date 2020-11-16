const BaseRepository = require("./repository"),
  activityModel = require("../model/Activity");

class ActivityRepository extends BaseRepository {
  constructor() {
    super(activityModel);
  }
  async findActivityById(id) {
    return await this.model.findById(id).populate("trip").lean();
  }
  async AllActivities(userId) {
    return await this.model.find({ userId }).populate("trip").lean();
  }
  async deleteActivity(id, userId) {
    return await this.model.findByIdAndRemove({ id, userId }).lean();
  }
}

module.exports = new ActivityRepository();
