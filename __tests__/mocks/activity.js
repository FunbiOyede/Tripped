const { Types } = require("mongoose");

module.exports = {
  activityDataOne: {
    place: "The kings Palace",
    address: "nassarawa",
    time: "8pm",
    date: "13th of september",
    trip: new Types.ObjectId(),
  },
  activityDataTwo: {
    place: "The red keep",
    address: "king's landing",
    time: "Noon",
    date: "3rd of winter",
    trip: new Types.ObjectId(),
  },
  activityDataThree: {
    place: "Dragonstone",
    address: "Blue sea",
    time: "5pm",
    date: "4th of january",
    trip: new Types.ObjectId(),
  },
  activityDataFour: {
    place: "Dominoes",
    address: "Blue sea",
    time: "5pm",
    date: "4th of january",
    trip: new Types.ObjectId(),
  },
};
