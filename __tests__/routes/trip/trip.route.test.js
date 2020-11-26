const app = require("../../../app");
const server = new app();
const supertest = require("supertest");
const mongoose = require("mongoose");
const config = require("../../../config/test");
const httpStatus = require("http-status-codes");
const tripModel = require("../../../data/model/Trips");
const { headers, authHeaders } = require("../../util/auth");
const request = supertest(server.app);
const userRepository = require("../../../data/repository/user.repository");
const tripRepository = require("../../../data/repository/trip.repository");
const { closeRedis } = require("../../../data/connections/connectRedis");
const jwt = require("../../../util/jwt");
const userData = require("../../mocks/user");
const { errorMessage } = require("../../util/constants");
const {
  tripDataOne,
  tripDataTwo,
  tripDataThree,
  tripDataFour,
  deletedTrip,
  deletedTripTwo,
} = require("../../mocks/trip");
describe("TRIP SERVICES", () => {
  let user;
  let accessToken;
  let tripId;
  let deletedTripId;

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
    tripDataTwo.userId = user._id;
    tripDataThree.userId = user._id;
    deletedTrip.userId = user._id;
    deletedTripTwo.userId = user._id;
    const docs = await tripModel.insertMany([
      tripDataTwo,
      tripDataThree,
      deletedTrip,
      deletedTripTwo,
    ]);
    tripId = docs[0]._id;
    deletedTripId = docs[2]._id;
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

    it("should get all trips", async (done) => {
      const res = await authHeaders(request.get("/trips"), accessToken);
      expect(res.statusCode).toBe(httpStatus.OK);
      expect(res.body.status).toBe("success");
      expect(res.body).toHaveProperty("data");
      expect(res.body.message).toBe("The list of trips");
      expect(res.body.data).toHaveLength(2);
      done();
    });
    it("should get a trip", async (done) => {
      const res = await authHeaders(
        request.get(`/trip/${tripId}`),
        accessToken
      );

      expect(res.statusCode).toBe(httpStatus.OK);
      expect(res.body.status).toBe("success");
      expect(res.body.data._id).toBe(tripId.toString());
      expect(res.body.data.location).toBe(tripDataTwo.location);
      expect(res.body.data.numberOfDays).toBe(tripDataTwo.numberOfDays);
      expect(res.body.data.deleted).toBe(tripDataTwo.deleted);

      done();
    });

    it("should delete a trip", async (done) => {
      const res = await authHeaders(
        request.delete(`/trip/${tripId}`),
        accessToken
      );

      expect(res.statusCode).toBe(httpStatus.OK);
      expect(res.body.status).toBe("success");
      expect(res.body.message).toBe("The trip was successfully deleted");
      expect(res.body).toHaveProperty("data");
      expect(res.body.data.deleted).toBe(true);
      expect(res.body.data.location).toBe(tripDataTwo.location);
      expect(res.body.data.numberOfDays).toBe(tripDataTwo.numberOfDays);
      done();
    });
    it("should update trip", async (done) => {
      const res = await authHeaders(
        request.post(`/trip/${tripId}`).send(tripDataFour),
        accessToken
      );

      expect(res.statusCode).toBe(httpStatus.OK);
      expect(res.body.status).toBe("success");
      expect(res.body.message).toBe("The trip was successfully updated");
      expect(res.body).toHaveProperty("data");
      expect(res.body.data.location).toBe(tripDataFour.location);
      expect(res.body.data.numberOfDays).toBe(tripDataFour.numberOfDays);
      done();
    });
    it("should restore a deleted trip", async (done) => {
      const res = await authHeaders(
        request.post(`/trip/${deletedTripId}/restore`),
        accessToken
      );

      expect(res.statusCode).toBe(httpStatus.OK);
      expect(res.body.status).toBe("success");
      expect(res.body.message).toBe("The trip was successfully restored");
      expect(res.body).toHaveProperty("data");
      expect(res.body.data.deleted).toBe(false);

      done();
    });
    it("should get all deleted or archived trips", async (done) => {
      const res = await authHeaders(
        request.get("/trips/archives"),
        accessToken
      );

      expect(res.statusCode).toBe(httpStatus.OK);
      expect(res.body.status).toBe("success");
      expect(res.body.message).toBe("The list of trips");
      expect(res.body).toHaveProperty("data");
      expect(res.body.data).toHaveLength(2);
      expect(res.body.data[0].deleted).toBe(true);
      expect(res.body.data[1].deleted).toBe(true);

      done();
    });
  });
});
