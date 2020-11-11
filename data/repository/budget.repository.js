const BaseRepository = require("./repository"),
  budgetModel = require("../model/Budget");

class BudgetRespository extends BaseRepository {
  constructor() {
    super(budgetModel);
  }
  async findBudgetById(id) {
    return await this.model.findById(id).populate("trip").lean();
  }
  async allBudgets(userId) {
    return await this.model.find({ userId }).populate("trip").lean();
  }
}

module.exports = new BudgetRespository();
