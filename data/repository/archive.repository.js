const BaseRepository = require("./repository"),
  archiveModel = require("../model/Archive");
class ArchiveRepository extends BaseRepository {
  constructor() {
    super(archiveModel);
  }

  async findArchiveById(id) {
    return await this.model.findById(id).populate("tripId").lean();
  }
}

module.exports = new ArchiveRepository();

//delete one and all  permantly
//recover
// deletes after 5 days done
