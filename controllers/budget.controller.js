const budgetService = require("../services/budget.service"),
  httpStatus = require("http-status-codes"),
  { BadRequestError } = require("../util/error"),
  BaseController = require("./controller");

class BudgetControllers extends BaseController {
  async createBudget(req, res, next) {
    try {
      const budget = await budgetService.createBudget(req.body);
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
}

module.exports = new BudgetControllers();
