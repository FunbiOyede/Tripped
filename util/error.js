const httpStatus = require("http-status-codes");

const ErrorType = {
  BAD_REQUEST: "BadRequestError",
  NOT_FOUND: "NotFoundError",
};

class BadRequestError extends Error {
  constructor(error) {
    super(error.message);
    (this.type = ErrorType.BAD_REQUEST),
      (this.statusCode = httpStatus.BAD_REQUEST);
  }
}

class NotFoundError extends Error {
  constructor(message = "Not Found") {
    super(message);
    (this.type = ErrorType.NOT_FOUND), (this.statusCode = httpStatus.NOT_FOUND);
  }
}

const handleError = (err, res) => {
  let { statusCode, message } = err;
  if (!statusCode && !message) {
    statusCode = httpStatus.INTERNAL_SERVER_ERROR;
    message = "Internal server error";
  }
  return res.status(statusCode).json({ status: "error", statusCode, message });
};

module.exports = {
  handleError,
  BadRequestError,
  NotFoundError,
};
