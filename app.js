const express = require("express"),
  cors = require("cors"),
  bodyParser = require("body-parser"),
  http = require("http");

class App {
  constructor() {
    this.app = express();
    this.configure();
  }
  configure() {
    this.app.use(cors());
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.get("/status", (req, res) => {
      res.status(200).json({ message: "Ready!, Up and running" });
    });
  }

  start() {
    const server = http.createServer(this.app);
    server.listen(3000, () => {
      console.log(`server is running on port ${3000}`);
    });
  }
}

module.exports = new App();
