const budgetService = require("../services/budget.service"),
  httpStatus = require("http-status-codes"),
  { BadRequestError } = require("../util/error"),
  BaseController = require("./controller");

class BudgetControllers extends BaseController {
  async createBudget(req, res, next) {
    try {
      const attr = { ...req.body, userId: req.user.userId };
      const budget = await budgetService.createBudget(attr);
      super.reply(
        res,
        httpStatus.CREATED,
        "The budget was successfully created",
        budget
      );
    } catch (error) {
      next(error);
    }
  }

  async getBudget(req, res, next) {
    const { id } = req.params;
    try {
      const budget = await budgetService.getBudget(id);
      super.reply(res, httpStatus.OK, "The requested budget 💸", budget);
    } catch (error) {
      next(error);
    }
  }
  async updateBudget(req, res, next) {
    const { id } = req.params;
    try {
      const budget = await budgetService.updateBudget(id, req.body);
      super.reply(
        res,
        httpStatus.OK,
        "The budget was successfully updated",
        budget
      );
    } catch (error) {
      next(error);
    }
  }

  async deleteBudget(req, res, next) {
    const { id } = req.params;
    try {
      const budget = await budgetService.deleteBudget(id);
      super.reply(
        res,
        httpStatus.OK,
        "The budget was successfully deleted",
        budget
      );
    } catch (error) {
      next(error);
    }
  }

  async allBudgets(req, res, next) {
    try {
      const { userId } = req.user;
      const budgets = await budgetService.allBudgets(userId);
      super.reply(res, httpStatus.OK, "The list of budgets", budgets);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new BudgetControllers();
