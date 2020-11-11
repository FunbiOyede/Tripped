const budgetRespository = require("../data/repository/budget.repository");
const { NotFoundError } = require("../util/error");
class BudgetServices {
  async createBudget(data) {
    try {
      data.amount = parseInt(data.amount);
      const budget = await budgetRespository.create(data);
      return budget;
    } catch (error) {
      throw error;
    }
  }

  async getBudget(id) {
    try {
      const budget = await budgetRespository.findBudgetById(id);
      if (!budget) {
        throw new NotFoundError("The specified budget was not found");
      }

      return budget;
    } catch (error) {
      throw error;
    }
  }
  async updateBudget(id, data) {
    try {
      const budget = await budgetRespository.update(id, data);
      return budget;
    } catch (error) {
      throw error;
    }
  }

  async allBudgets(userId) {
    try {
      const budgets = await budgetRespository.allBudgets(userId);

      return budgets;
    } catch (error) {
      throw error;
    }
  }
  async deleteBudget(id) {
    try {
      const budget = await budgetRespository.delete(id);
      return budget;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new BudgetServices();
