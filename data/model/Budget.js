const mongoose = require("mongoose");
const Budget = new mongoose.Schema({
  amount: {
    type: Number,
    required: true,
  },
  currency: {
    type: String,
    default: "₦",
  },
  tripId: { type: mongoose.Schema.Types.ObjectId, ref: "Trip" },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Budget", Budget);
