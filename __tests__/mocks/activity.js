const { Types } = require("mongoose");

module.exports = {
  acitvityDataOne: {
    place: "The kings Palace",
    address: "nassarawa",
    time: "8pm",
    date: "13th of september",
    trip: new Types.ObjectId(),
  },
  acitvityDataTwo: {
    place: "The red keep",
    address: "king's landing",
    time: "Noon",
    date: "3rd of winter",
    trip: new Types.ObjectId(),
  },
};
