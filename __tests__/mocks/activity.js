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
  acitvityDataThree: {
    place: "Dragonstone",
    address: "Blue sea",
    time: "5pm",
    date: "4th of january",
    trip: new Types.ObjectId(),
  },
  acitvityDataFour: {
    place: "Dominoes",
    address: "Blue sea",
    time: "5pm",
    date: "4th of january",
    trip: new Types.ObjectId(),
  },
};
