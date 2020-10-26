const BaseRepository = require("./repository"),
  budgetModel = require("../model/Budget");

class BudgetRespository extends BaseRepository {
  constructor() {
    super(budgetModel);
  }
  async findBudgetById(id) {
    return await this.model.findById(id).populate("tripId").lean();
  }
}

module.exports = new BudgetRespository();
