const app = require("../../../app");
const server = new app();
const supertest = require("supertest");
const mongoose = require("mongoose");
const budgetModel = require("../../../data/model/Budget");
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
const {
  budgetDataOne,
  budgetDataTwo,
  budgetDataThree,
  budgetDataFour,
} = require("../../mocks/budget");

describe("BUDGET SERVICES", () => {
  let user;
  let accessToken;
  let budgetId;
  beforeAll(async () => {
    await mongoose.connect(config.TEST_DB_URL, config.DB_CONFIG, (err) => {
      if (err) {
        console.error(err);
        process.exit(1);
      }
    });
    await closeRedis();
  });
  afterAll(async (done) => {
    await closeRedis();
    await mongoose.connection.close();

    done();
  });
  beforeEach(async () => {
    user = await userRepository.create(userData.userOne);
    accessToken = await jwt.generateAccessToken(user);
    budgetDataTwo.userId = user._id;
    budgetDataThree.userId = user._id;
    const docs = await budgetModel.insertMany([budgetDataTwo, budgetDataThree]);
    budgetId = docs[0]._id;
  });

  afterEach(async () => {
    await userRepository.deleteAll(), budgetRepository.deleteAll();
  });

  describe("POST /budget", () => {
    it("should send an error if authorization header not present", async (done) => {
      const res = await headers(request.post("/budget").send(budgetDataOne));
      expect(res.status).toBe(httpStatus.UNAUTHORIZED);
      expect(res.body.type).toBe(errorMessage.Authentication.type);
      expect(res.body.message).toBe(errorMessage.Authentication.message);
      done();
    });

    it("should create a budget successfully", async (done) => {
      const res = await authHeaders(
        request.post("/budget").send(budgetDataOne),
        accessToken
      );

      expect(res.status).toBe(httpStatus.CREATED);
      expect(res.statusCode).toBe(httpStatus.CREATED);
      expect(res.body).toHaveProperty("data");
      expect(res.body.message).toBe("The budget was successfully created");
      expect(res.body.data).toHaveProperty("_id");
      expect(res.body.data).toHaveProperty("currency");
      expect(res.body.data).toHaveProperty("amount");
      expect(res.body.data).toHaveProperty("trip");
      expect(res.body.data).toHaveProperty("userId");

      done();
    });

    it("should send an error if an empty body is sent", async (done) => {
      const res = await authHeaders(
        request.post("/budget").send({}),
        accessToken
      );
      expect(res.body.statusCode).toBe(httpStatus.BAD_REQUEST);
      expect(res.body.error).toBe(errorMessage.Validation.type);
      done();
    });

    it("should get all budgets", async (done) => {
      const res = await authHeaders(request.get("/budgets"), accessToken);
      expect(res.statusCode).toBe(httpStatus.OK);
      expect(res.body.status).toBe("success");
      expect(res.body.message).toBe("The list of budgets");
      expect(res.body).toHaveProperty("data");
      expect(res.body.data).toHaveLength(2);
      done();
    });
    it("should get a budget", async (done) => {
      const res = await authHeaders(
        request.get(`/budget/${budgetId}`),
        accessToken
      );

      expect(res.statusCode).toBe(httpStatus.OK);
      expect(res.body.status).toBe("success");
      expect(res.body.data._id).toBe(budgetId.toString());
      expect(res.body.data.amount).toBe(budgetDataTwo.amount);
      done();
    });
    it("should delete a budget", async (done) => {
      const res = await authHeaders(
        request.delete(`/budget/${budgetId}`),
        accessToken
      );

      expect(res.statusCode).toBe(httpStatus.OK);
      expect(res.body.status).toBe("success");
      expect(res.body.message).toBe("The budget was successfully deleted");
      expect(res.body).toHaveProperty("data");
      expect(res.body.data.amount).toBe(budgetDataTwo.amount);
      done();
    });
    it("should update a budet", async (done) => {
      const res = await authHeaders(
        request.post(`/budget/${budgetId}`).send(budgetDataFour),
        accessToken
      );

      expect(res.statusCode).toBe(httpStatus.OK);

      expect(res.body.status).toBe("success");
      expect(res.body.message).toBe("The budget was successfully updated");
      expect(res.body).toHaveProperty("data");
      expect(res.body.data.amount).toBe(budgetDataFour.amount);
      done();
    });
  });
});
