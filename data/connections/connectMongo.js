const mongoose = require("mongoose");

const setupDB = () => {
  return new mongoose.connect("mongodb://127.0.0.1:27017/Tripped", {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  });
};

module.exports = { setupDB };
