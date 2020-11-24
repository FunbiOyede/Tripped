const app = require("../../../app");
const server = new app();
const supertest = require("supertest");
const mongoose = require("mongoose");
const config = require("../../../config/test");
const httpStatus = require("http-status-codes");
const { headers, authHeaders } = require("../../util/auth");
const request = supertest(server.app);
const userRepository = require("../../../data/repository/user.repository");
const budgetRepository = require("../../../data/repository/budget.repository");
const { closeRedis } = require("../../../data/connections/connectRedis");
const jwt = require("../../../util/jwt");
const userData = require("../../mocks/user");
const { errorMessage } = require("../../util/constants");
const { budgetDataOne } = require("../../mocks/budget");
describe("BUDGET SERVICES", () => {
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
    await userRepository.deleteAll(),
      budgetRepository.deleteAll(),
      closeRedis();
  });

  describe("POST /budget", () => {
    it("should send an error if authorization header not present", async (done) => {
      const res = await headers(request.post("/budget").send(budgetDataOne));
      expect(res.status).toBe(httpStatus.UNAUTHORIZED);
      expect(res.body.type).toBe(errorMessage.Authentication.type);
      expect(res.body.message).toBe(errorMessage.Authentication.message);
      done();
    });
  });
});
