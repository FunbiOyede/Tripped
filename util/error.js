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
  constructor(message) {
    super(message);
    (this.type = ErrorType.NOT_FOUND), (this.statusCode = httpStatus.NOT_FOUND);
  }
}

class TripNotFoundError extends Error {
  constructor(message) {
    super(message);
    (this.type = ErrorType.NOT_FOUND), (this.statusCode = httpStatus.NOT_FOUND);
  }
}

const handleError = (error, res) => {
  if (error.name == "CastError") {
    handleCastError(error, res);
  }
  error.statusCode = error.statusCode || httpStatus.INTERNAL_SERVER_ERROR;
  error.status = error.status || "error";
  error.message = error.message || "Internal Server Error";

  return res.status(error.statusCode).json({
    status: error.status,
    message: error.message,
  });
};

const handleCastError = (error, res) => {
  error.statusCode = 400;
  return res.status(error.statusCode).json({
    status: "error",
    message: `Invalid ${error.path}: ${error.value}`,
  });
};

module.exports = {
  handleError,
  BadRequestError,
  NotFoundError,
  TripNotFoundError,
};
