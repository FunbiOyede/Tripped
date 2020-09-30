const express = require("express"),
  cors = require("cors"),
  bodyParser = require("body-parser"),
  http = require("http"),
  mongoose = require("mongoose"),
  { setupDB } = require("./data/connections/connectMongo");
const config = require("./config/index");

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
    const server = http.createServer(this.app);
    setupDB();
    mongoose.connection
      .on("connecting", () => {
        console.log("connecting to mongodb server");
      })
      .on("connected", () => {
        console.log("Connected to MongoDB, starting API server..");
        server.listen(config.PORT, () => {
          console.log(`server is running on port ${3000}`);
        });
      })
      .on("disconnected", () => {
        console.log(`database is disconnected, closing server`);
        server.close();
      })
      .on("error", (error) => {
        console.log(`Database error ${error.message}`);
      });

    const handleExit = (signal) => {
      console.log(`Received ${signal}`);
      console.log("closing the server");
      server.close(() => {
        console.log("closing database");
        mongoose.connection.close(() => {
          process.exit(0);
        });
      });
    };
    process.on("SIGINT", handleExit);
    process.on("SIGQUIT", handleExit);
    process.on("SIGTERM", handleExit);
  }
}

module.exports = new App();
