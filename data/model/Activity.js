const mongoose = require("mongoose");

const Activity = new mongoose.Schema({
  place: {
    type: String,
    required: true,
  },
  address: {
    type: String,
  },
  time: { type: String },
  date: { type: String },
  trip: { type: mongoose.Schema.Types.ObjectId, ref: "Trip" },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Activity", Activity);
