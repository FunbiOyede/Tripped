const headers = (request) => {
  return request.set("Content-Type", "application/json").timeout(2000);
};

const authHeaders = (request, accessToken) => {
  return request
    .set("Content-Type", "application/json")
    .set("token", `${accessToken}`);
};

module.exports = {
  headers,
  authHeaders,
};
