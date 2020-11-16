const express = require("express"),
  cors = require("cors"),
  bodyParser = require("body-parser"),
  router = require("./api/routes/index");
httpStatus = require("http-status-codes");
(http = require("http")),
  (expressWinston = require("express-winston")),
  ({ httpLogger } = require("./util/logger")),
  (activityRouter = require("./api/routes/activity.route")),
  (budgetRouter = require("./api/routes/budget.route")),
  (mongoose = require("mongoose")),
  ({ setupDB } = require("./data/connections/connectMongo")),
  (config = require("./config/index")),
  (tripRouter = require("./api/routes/trip.route")),
  ({ handleError, NotFoundError } = require("./util/error")),
  ({ errors } = require("celebrate")),
  ({ logger } = require("./util/logger")),
  ({ connectRedis } = require("./data/connections/connectRedis"));
require("dotenv").config();
require("./data/repository/cache");

class App {
  constructor() {
    this.app = express();
    this.configure();
  }
  configure() {
    this.app.use(cors());
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(router);
    this.app.use(tripRouter);

    this.app.use(budgetRouter);
    this.app.use(activityRouter);
    this.app.use(expressWinston.logger(httpLogger()));
    this.app.use(errors());
    this.app.get("/status", async (req, res) => {
      res.status(httpStatus.OK).json({ message: "Ready!, Up and running" });
    });

    this.app.use((req, res, next) => {
      next(new NotFoundError("Routes not Found"));
    });
    this.app.use((error, req, res, next) => {
      handleError(error, res);
    });
  }

  start() {
    const server = http.createServer(this.app);
    setupDB();
    connectRedis();
    mongoose.connection
      .on("connecting", () => {
        logger.info("connecting to mongodb server");
      })
      .on("connected", () => {
        logger.info("Connected to MongoDB, starting API server..");
        server.listen(config.PORT, () => {
          logger.info(process.env.NODE_ENV);
          logger.info(`server is running on port ${3000}`);
        });
      })
      .on("disconnected", () => {
        logger.info(`database is disconnected, closing server`);
        server.close();
      })
      .on("error", (error) => {
        logger.error(`Database error ${error.message}`);
      });

    const handleSuccessExit = (signal) => {
      logger.info(`Received ${signal}`);
      logger.info("closing the server");
      server.close(() => {
        logger.info("closing database");
        mongoose.connection.close(() => {
          process.exit(0);
        });
      });
    };

    const handleFailureExit = (error) => {
      logger.info(`Received ${error}`);
    };

    process.on("SIGINT", handleSuccessExit);
    process.on("SIGQUIT", handleSuccessExit);
    process.on("SIGTERM", handleSuccessExit);
    process.on("uncaughtException", handleFailureExit);
    process.on("unhandledRejection", handleFailureExit);
  }
}

module.exports = new App();
