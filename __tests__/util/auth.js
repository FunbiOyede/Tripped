const config = require("../../config/test");
const { sign } = require("jsonwebtoken");
const headers = (request) => {
  return request.set("Content-Type", "application/json").timeout(2000);
};

const authHeaders = (request, accessToken) => {
  return request
    .set("Content-Type", "application/json")
    .set("token", `${accessToken}`);
};
// const generateAccessToken = async (payload) => {
//   const email = payload.email;
//   const AccessToken = await sign({ email: email }, config.ACCESS_TOKEN, {
//     expiresIn: "5d",
//   });

//   return AccessToken;
// };

module.exports = {
  headers,
  authHeaders,
  // generateAccessToken,
};
