const mongoose = require("mongoose");

const Trip = new mongoose.Schema({
  Title: {
    type: String,
  },
  StartDate: { type: Date, required: true },
  EndDate: { type: Date, required: true },
  Description: { type: Date, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

module.exports = mongoose.model("Trip", Trip);
