const mongoose = require("mongoose");
const { calculateDateDifference } = require("../../util/index");
const Trip = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  location: { type: String, required: true },
  numberOfDays: { type: String },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  createdAt: { type: Date, default: Date.now },
});

// Trip.pre("save", function (next) {
//   if (!this.isModified("numberOfDays")) {
//     return next();
//   }
//   this.numberOfDays = calculateDateDifference(this.endDate, this.startDate);
//   next();
// });
module.exports = mongoose.model("Trip", Trip);
