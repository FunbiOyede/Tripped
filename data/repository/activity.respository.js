const BaseRepository = require("./repository"),
  activityModel = require("../model/Activity");

class ActivityRepository extends BaseRepository {
  constructor() {
    super(activityModel);
  }
  async findActivityById(id) {
    return await this.model.findById(id).populate("trip").lean();
  }
  async AllActivities() {
    return await this.model.find().populate("trip").lean();
  }
}

module.exports = new ActivityRepository();
