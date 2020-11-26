const { Types } = require("mongoose");

module.exports = {
  budgetDataOne: {
    amount: 700,
    currency: "$",
    trip: new Types.ObjectId(),
  },
  budgetDataTwo: {
    amount: 700,
    currency: "#",
    trip: new Types.ObjectId(),
  },
  budgetDataThree: {
    amount: 80,
    currency: "£",
    trip: new Types.ObjectId(),
  },
  budgetDataFour: {
    amount: 20,
    currency: "€",
  },
};
