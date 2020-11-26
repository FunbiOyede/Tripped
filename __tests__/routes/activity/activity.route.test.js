const app = require("../../../app");
const server = new app();
const supertest = require("supertest");
const mongoose = require("mongoose");
const activityModel = require("../../../data/model/Activity");
const config = require("../../../config/test");
const activityRepository = require("../../../data/repository/activity.respository");
const userRepository = require("../../../data/repository/user.repository");
const httpStatus = require("http-status-codes");
const request = supertest(server.app);
const { closeRedis } = require("../../../data/connections/connectRedis");
const userData = require("../../mocks/user");
const { headers, authHeaders } = require("../../util/auth");
const { errorMessage } = require("../../util/constants");
const {
  activityDataOne,
  activityDataTwo,
  activityDataThree,
  activityDataFour,
} = require("../../mocks/activity");
const jwt = require("../../../util/jwt");

describe("ACTIVITY SERVICES", () => {
  let user;
  let accessToken;
  let activityId;

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

    closeRedis();
  });
  afterAll((done) => {
    closeRedis();
    done();
  });
  beforeEach(async () => {
    user = await userRepository.create(userData.userOne);
    accessToken = await jwt.generateAccessToken(user);
    activityDataTwo.userId = user._id;
    activityDataThree.userId = user._id;
    const docs = await activityModel.insertMany([
      activityDataTwo,
      activityDataThree,
    ]);

    activityId = docs[0]._id;
  });

  afterEach(async () => {
    await userRepository.deleteAll(), await activityRepository.deleteAll();
  });

  describe("POST /activity", () => {
    it("should send an error if authorization header not present", async (done) => {
      const res = await headers(
        request.post("/activity").send(activityDataOne)
      );
      expect(res.status).toBe(httpStatus.UNAUTHORIZED);
      expect(res.body.type).toBe(errorMessage.Authentication.type);
      expect(res.body.message).toBe(errorMessage.Authentication.message);
      done();
    });

    it("should create an activity successfully", async (done) => {
      const res = await authHeaders(
        request.post("/activity").send(activityDataOne),
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

    it("should send an error if an empty body is sent", async (done) => {
      const res = await authHeaders(
        request.post("/activity").send({}),
        accessToken
      );
      expect(res.body.statusCode).toBe(httpStatus.BAD_REQUEST);
      expect(res.body.error).toBe(errorMessage.Validation.type);
      done();
    });
  });

  it("should get all activities", async (done) => {
    const res = await authHeaders(request.get("/activities"), accessToken);
    expect(res.statusCode).toBe(httpStatus.OK);
    expect(res.body.status).toBe("success");
    expect(res.body.message).toBe("The list of activities");
    expect(res.body).toHaveProperty("data");
    expect(res.body.data).toHaveLength(2);
    done();
  });

  it("should get an activity", async (done) => {
    const res = await authHeaders(
      request.get(`/activity/${activityId}`),
      accessToken
    );

    expect(res.statusCode).toBe(httpStatus.OK);
    expect(res.body.status).toBe("success");
    expect(res.body.data._id).toBe(activityId.toString());
    expect(res.body.data.address).toBe(activityDataTwo.address);
    done();
  });

  it("should delete an activity", async (done) => {
    const res = await authHeaders(
      request.delete(`/activity/${activityId}`),
      accessToken
    );
    expect(res.statusCode).toBe(httpStatus.OK);
    expect(res.body.status).toBe("success");
    expect(res.body.message).toBe("The activity was successfully deleted");
    expect(res.body).toHaveProperty("data");
    done();
  });
  it("should update an activity", async (done) => {
    const res = await authHeaders(
      request.post(`/activity/${activityId}`).send(activityDataFour),
      accessToken
    );
    expect(res.statusCode).toBe(httpStatus.OK);
    expect(res.body.status).toBe("success");
    expect(res.body.message).toBe("The activity was successfully updated");
    expect(res.body).toHaveProperty("data");
    expect(res.body.data.address).toBe(activityDataFour.address);
    done();
  });
});
