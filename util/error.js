const httpStatus = require("http-status-codes");
const { logger } = require("../util/logger");

const ErrorType = {
  BAD_REQUEST: "BadRequestError",
  NOT_FOUND: "NotFoundError",
  VALIDATOR: "ValidationError",
  UNAUTHENTICATED: "UNAUTHENTICATED",
};

class ApiError extends Error {
  constructor(type, message) {
    super(type);
  }
}

// class NotFoundError extends ApiError {
//   constructor(message = "Not Found") {
//     super(ErrorType.NOT_FOUND, message);
//     this.statusCode = httpStatus.NOT_FOUND;
//   }
// }
class NotFoundError extends Error {
  constructor(message) {
    super(message);
    (this.type = ErrorType.NOT_FOUND), (this.statusCode = httpStatus.NOT_FOUND);
  }
}

class BadRequestError extends Error {
  constructor(error) {
    super(error.message);
    (this.type = ErrorType.BAD_REQUEST),
      (this.statusCode = httpStatus.BAD_REQUEST);
  }
}

class TripNotFoundError extends Error {
  constructor(message) {
    super(message);
    (this.type = ErrorType.NOT_FOUND), (this.statusCode = httpStatus.NOT_FOUND);
  }
}
class ValidatorError extends Error {
  constructor(message) {
    super(message);
    (this.type = ErrorType.VALIDATOR),
      (this.statusCode = httpStatus.BAD_REQUEST);
  }
}

class GoogleAuthError extends Error {
  constructor(message) {
    super(message);
    (this.type = ErrorType.UNAUTHENTICATED),
      (this.statusCode = httpStatus.UNAUTHORIZED);
  }
}

const handleError = (error, res) => {
  logger.error(error.message, error.status, error);
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
  ValidatorError,
  GoogleAuthError,
};
