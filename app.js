const express = require("express"),
  cors = require("cors"),
  bodyParser = require("body-parser"),
  http = require("http"),
  UserModel = require("./data/model/User");
const mongoose = require("mongoose"),
  { setupDB } = require("./data/connections/connectMongo");

class App {
  constructor() {
    this.app = express();
    this.configure();
  }
  configure() {
    this.app.use(cors());
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.get("/status", async (req, res) => {
      res.status(200).json({ message: "Ready!, Up and running" });
    });
  }

  start() {
    setupDB();
    mongoose.connection
      .on("connecting", () => {
        console.log("connecting to mongodb server");
      })
      .on("connected", () => {
        console.log("Connected to MongoDB, starting API server..");
        const server = http.createServer(this.app);
        server.listen(3000, () => {
          console.log(`server is running on port ${3000}`);
        });
      })
      .on("disconnected", () => {
        console.log(`database is disconnecting, server will be closed`);
      })
      .on("error", (error) => {
        console.log(`Database error ${error.message}`);
      });
  }
}

module.exports = new App();
