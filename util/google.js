const queryString = require("query-string");
const config = require("../config/index");
const { GoogleAuthError } = require("../util/error");
const axios = require("axios");
const stringifiedParams = queryString.stringify({
  client_id: config.GOOGLE_CLIENT_ID,
  redirect_uri: "http://localhost:3000/auth/google/callback",
  scope: [
    "https://www.googleapis.com/auth/userinfo.email",
    "https://www.googleapis.com/auth/userinfo.profile",
  ].join(" "), // space seperated string
  response_type: "code",
  access_type: "offline",
  prompt: "consent",
});
const googleLoginUrl = `https://accounts.google.com/o/oauth2/v2/auth?${stringifiedParams}`;

module.exports = {
  googleLoginUrl,
};
