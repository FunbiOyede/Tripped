module.exports = {
  errorMessage: {
    Authentication: {
      type: "MissingAuthorizationError",
      message: "Missing token header. Unable to authenticate request",
    },
    Validation: {
      type: "Bad Request",
      message: "celebrate request validation failed",
    },
  },
};
