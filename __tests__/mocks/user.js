const { Types } = require("mongoose");
module.exports = {
  userOne: {
    name: "Isaac Periwinkle",
    email: "periwinkle@gmail.com",
  },
  userTwo: {
    _id: new Types.ObjectId(),
    name: "King Arthur",
    email: "arthur@gmail.com",
  },
};
