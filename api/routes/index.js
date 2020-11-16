const router = require("express").Router();
const tripController = require("../../controllers/trip.controllers");
const { celebrate, Joi, Segments } = require("celebrate");
const budgetController = require("../../controllers/budget.controller");
const cacheMiddleware = require("../../middlewares/cacheMiddleware");
const acitivityController = require("../../controllers/activity.controller");
const config = require("../../config/index");
const { googleLoginUrl } = require("../../util/google");
const userController = require("../../controllers/user.controller");
const axios = require("axios");
const auth = require("../../middlewares/auth");

//google auth
// router.post("/authenticate/google", (req, res, next) => {
//   console.log(googleLoginUrl);
// });
// router.get("/auth/google/callback", async (req, res, next) => {
//   const { code } = req.query;
//   console.log(code);
//   const { data } = await axios({
//     url: `https://oauth2.googleapis.com/token`,
//     method: "post",
//     data: {
//       client_id: config.GOOGLE_CLIENT_ID,
//       client_secret: config.GOOGLE_SECRET_ID,
//       redirect_uri: "http://localhost:3000/auth/google/callback",
//       grant_type: "authorization_code",
//       code,
//     },
//   });
//   console.log(data);

//   const payload = await axios({
//     url: "https://www.googleapis.com/oauth2/v2/userinfo",
//     method: "get",
//     headers: {
//       Authorization: `Bearer ${data.access_token}`,
//     },
//   });
//   console.log(payload);
// });

router.post("/google", userController.createUser);
router.get("/user", auth.isAuthenticated, userController.getUser);

module.exports = router;
