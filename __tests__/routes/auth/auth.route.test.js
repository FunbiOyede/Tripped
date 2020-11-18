const app = require("../../../app");
const server = new app();
const supertest = require("supertest");
const mongoose = require("mongoose");
const config = require("../../../config");
const userRepository = require("../../../data/repository/user.repository");
const httpStatus = require("http-status-codes");
const request = supertest(server.app);
const { closeRedis } = require("../../../data/connections/connectRedis");
beforeEach(async () => {
  await mongoose.connect(config.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  await userRepository.deleteAll();
  closeRedis();
});

afterEach(() => console.log("i am done"));

describe("POST /google", () => {
  //throw an error if there is no token to be authenticated by google
  //throws 401 if token is expired, 401 is from google
  //creates user successfully if token is valid
  it("should send an error if empty body is sent", async (done) => {
    const res = await request
      .post("/google")
      .send({})
      .set("Accept", "application/json");
    expect(res.status).toBe(httpStatus.BAD_REQUEST);
    done();
  });
});
