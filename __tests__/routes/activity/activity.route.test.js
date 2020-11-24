const app = require("../../../app");
const server = new app();
const supertest = require("supertest");
const mongoose = require("mongoose");
const config = require("../../../config/test");
const activityRepository = require("../../../data/repository/activity.respository");
const userRepository = require("../../../data/repository/user.repository");
const httpStatus = require("http-status-codes");
const request = supertest(server.app);
const { closeRedis } = require("../../../data/connections/connectRedis");
const userData = require("../../mocks/user");
const { headers, authHeaders } = require("../../util/auth");
const { errorMessage } = require("../../util/constants");
const { acitvityDataOne, acitvityDataTwo } = require("../../mocks/activity");
const jwt = require("../../../util/jwt");

describe("ACTIVITY SERVICES", () => {
  let user;
  let accessToken;

  beforeAll(async () => {
    await mongoose.connect(
      config.TEST_DB_URL,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
      (err) => {
        if (err) {
          console.error(err);
          process.exit(1);
        }
      }
    );
  });
  beforeEach(async () => {
    user = await userRepository.create(userData.userOne);
    accessToken = await jwt.generateAccessToken(user);
    closeRedis();
  });

  afterEach(async () => {
    closeRedis(),
      await userRepository.deleteAll(),
      await activityRepository.deleteAll();
  });

  describe("POST /activity", () => {
    it("should send an error if authorization header not present", async (done) => {
      const res = await headers(
        request.post("/activity").send(acitvityDataOne)
      );
      expect(res.status).toBe(httpStatus.UNAUTHORIZED);
      expect(res.body.type).toBe(errorMessage.Authentication.type);
      expect(res.body.message).toBe(errorMessage.Authentication.message);
      done();
    });

    it("should create an activity successfully", async (done) => {
      const res = await authHeaders(
        request.post("/activity").send(acitvityDataOne),
        accessToken
      );
      expect(res.status).toBe(httpStatus.CREATED);
      expect(res.statusCode).toBe(httpStatus.CREATED);
      expect(res.body).toHaveProperty("data");
      expect(res.body.data).toHaveProperty("_id");
      expect(res.body.data).toHaveProperty("userId");
      expect(res.body.data).toHaveProperty("address");

      done();
    });
  });

  //test for validation
});
