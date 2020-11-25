const app = require("../../../app");
const server = new app();
const supertest = require("supertest");
const mongoose = require("mongoose");
const config = require("../../../config/test");
const httpStatus = require("http-status-codes");
const { headers, authHeaders } = require("../../util/auth");
const request = supertest(server.app);
const userRepository = require("../../../data/repository/user.repository");
const tripRepository = require("../../../data/repository/trip.repository");
const { closeRedis } = require("../../../data/connections/connectRedis");
const jwt = require("../../../util/jwt");
const userData = require("../../mocks/user");
const { errorMessage } = require("../../util/constants");
const { tripDataOne } = require("../../mocks/trip");
describe("TRIP SERVICES", () => {
  let user;
  let accessToken;

  beforeAll(async () => {
    await mongoose.connect(
      config.TEST_DB_URL,
      {
        useNewUrlParser: true,
        useCreateIndex: false,
        useUnifiedTopology: true,
        useFindAndModify: false,
        serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
        socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
      },
      (err) => {
        if (err) {
          console.error(err);
          process.exit(1);
        }
      }
    );
  });

  afterAll((done) => {
    closeRedis();
    done();
  });
  beforeEach(async () => {
    user = await userRepository.create(userData.userOne);
    accessToken = await jwt.generateAccessToken(user);
  });

  afterEach(async () => {
    await userRepository.deleteAll(), tripRepository.deleteAll();
  });

  describe("POST /trip", () => {
    it("should send an error if authorization header not present", async (done) => {
      const res = await headers(request.post("/trip").send(tripDataOne));
      expect(res.status).toBe(httpStatus.UNAUTHORIZED);
      expect(res.body.type).toBe(errorMessage.Authentication.type);
      expect(res.body.message).toBe(errorMessage.Authentication.message);
      done();
    });

    it("should create a trip successfully", async (done) => {
      const res = await authHeaders(
        request.post("/trip").send(tripDataOne),
        accessToken
      );

      expect(res.status).toBe(httpStatus.CREATED);
      expect(res.statusCode).toBe(httpStatus.CREATED);
      expect(res.body).toHaveProperty("data");
      expect(res.body.data).toHaveProperty("_id");
      expect(res.body.data).toHaveProperty("userId");
      expect(res.body.data).toHaveProperty("location");
      expect(res.body.data).toHaveProperty("title");
      expect(res.body.data).toHaveProperty("startDate");
      expect(res.body.data).toHaveProperty("endDate");
      expect(res.body.data).toHaveProperty("numberOfDays");
      done();
    });

    it("should send an error if an empty body is sent", async (done) => {
      const res = await authHeaders(
        request.post("/trip").send({}),
        accessToken
      );
      expect(res.body.statusCode).toBe(httpStatus.BAD_REQUEST);
      expect(res.body.error).toBe(errorMessage.Validation.type);
      done();
    });
  });
});
