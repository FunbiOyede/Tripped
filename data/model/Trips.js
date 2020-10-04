const mongoose = require("mongoose");

const Trip = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  location: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Trip", Trip);
