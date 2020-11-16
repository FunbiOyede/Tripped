const { celebrate, Joi, Segments } = require("celebrate");
const budgetController = require("../../controllers/budget.controller");
const budgetRouter = require("express").Router();
const auth = require("../../middlewares/auth");
//CREATE BUDGET
budgetRouter.post(
  "/budget",
  [
    celebrate({
      [Segments.BODY]: Joi.object().keys({
        amount: Joi.number().required(),
        currency: Joi.string().required(),
        trip: Joi.string().required(),
      }),
    }),
  ],
  auth.isAuthenticated,
  budgetController.createBudget
);

//GET A BUDGET
budgetRouter.get(
  "/budget/:id",
  auth.isAuthenticated,
  budgetController.getBudget
);
// UPDATE BUDGET
budgetRouter.post(
  "/budget/:id",
  [
    celebrate({
      [Segments.BODY]: Joi.object().keys({
        amount: Joi.number().required(),
        currency: Joi.string(),
      }),
    }),
  ],
  auth.isAuthenticated,
  budgetController.updateBudget
);

//GET ALL BUDGETS
budgetRouter.get("/budgets", auth.isAuthenticated, budgetController.allBudgets);
//DELETE BUDGETS
budgetRouter.delete(
  "/budget/:id",
  auth.isAuthenticated,
  budgetController.deleteBudget
);

module.exports = budgetRouter;
