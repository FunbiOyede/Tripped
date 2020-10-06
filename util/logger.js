const winston = require("winston");
const { format, transports, createLogger } = winston;
const { combine, timestamp, simple, json, colorize, label, printf } = format;
const transport = [];

const options = {
  file: {
    filename: ".logs/error.log",
    level: "error",
    handleExceptions: true,
    json: true,
    maxsize: 5242880,
    maxFiles: 5,
    colorize: false,
  },
  console: {
    level: "debug",
    handleExceptions: true,
    format: simple(),
    colorize: true,
  },
};
if (process.env.NODE_ENV !== "production") {
  transport.push(new transports.Console(options.console));
} else {
  transport.push(new transports.File(options.file));
}

const logger = createLogger({
  format: combine(
    timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    json(),
    colorize()
  ),
  transports: transport,
});

const httpLogger = () => {
  return {
    transports: transport,
    level: "info",
    format: combine(
      label({
        label: "HTTP Requests",
      }),
      timestamp(),
      printf((info) => {
        return `  ${info.timestamp} - ${info.label}:[${info.level}] - ${info.message}  `;
      })
    ),
    msg:
      "method={{req.method}}, route={{req.url}}, code={{res.statusCode}}, response-time={{res.responseTime}}ms",
  };
};

module.exports = {
  logger,
  httpLogger,
};
