const app = require("../../../app");
const server = new app();
const supertest = require("supertest");
const mongoose = require("mongoose");
const config = require("../../../config/test");
const userRepository = require("../../../data/repository/user.repository");
const httpStatus = require("http-status-codes");
const request = supertest(server.app);
const { closeRedis } = require("../../../data/connections/connectRedis");
const { headers } = require("../../util/auth");

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
  await userRepository.deleteAll();
});

afterEach(async () => await userRepository.deleteAll());

describe("POST /google", () => {
  //throw an error if there is no token to be authenticated by google
  //throws 401 if token is expired, 401 is from google
  //creates user successfully if token is valid
  it("should send an error if empty body is sent", async (done) => {
    const res = await headers(request.post("/google").send({}));
    expect(res.status).toBe(httpStatus.BAD_REQUEST);
    done();
  });
});

describe("POST /google", () => {
  //throw an error if there is no token to be authenticated by google
  //throws 401 if token is expired, 401 is from google
  //creates user successfully if token is valid
  it("should send an error if empty body is sent", async (done) => {
    const res = await headers(request.post("/google").send({}));
    expect(res.status).toBe(httpStatus.BAD_REQUEST);
    done();
  });
  it("should send an error if the token is expired", async (done) => {
    const res = await headers(
      request.post("/google").send({
        token:
          " ya29.A0AfH6SMB_r_TDEZJE4AjgzrGRheJj_xMEnbzBIAr2YPU2M7j-9_8-682557ELXXyBefaqe0O7qfp1vP6vrF6E7ydqDcZdUkRMFnXxGhVWd9zFVnHCL_xqQzbz50PME-oeqm836sJcXdzLZBsCC7JJ-BVrsD6A-uLP8y7GX-cS0K0",
      })
    );

    expect(res.status).toBe(httpStatus.UNAUTHORIZED);
    done();
  });

  it("should send an error if the token is invalid", async (done) => {
    const res = await headers(
      request.post("/google").send({
        token:
          " ya29.A0AfH6SMB_r_TDEZJE4AjgzrGRheJj_xMEnbzBIAr2YPU2M7j-9_8-682557ELXXyBefaqe0O7qfp1vP6vrF6E7ydqDcZdUkRMFnXxGhVWd9zFVnHCL_xqQzbz50PME-oeqm836sJcXdzLZBsCC7JJ-BVrsD6A-uLP8y7GX-cS",
      })
    );

    expect(res.status).toBe(httpStatus.UNAUTHORIZED);
    done();
  });
  //needs a acess token from google
  //   it("should send success for valid token", async (done) => {
  //     const res = await request
  //       .post("/google")
  //       .send({
  //         token:
  //           "ya29.a0AfH6SMBb96vp733R53fU3eUiu2yt0SlkyHokagvsISRFHfzRX5Mwuz4ipt-mKbYrzrXlvA15lAsZyfg3av7u4K29sL3mY3sfDMydq8iCFw6psZi7PfX-XN8ApscA4_ezE8UshZ4FLTYl8Xm2bcgm6kJewhLechwvUuRL-1phyZY",
  //       })
  //       .set("Accept", "application/json");
  //     console.log(res.body);
  //     // expect(res.statusCode).toBe(httpStatus.CREATED);
  //     // expect(res.body.status).toBe("success");
  //     // expect(res.body.data).toHaveProperty("accessToken");
  //     // expect(res.body.data).toHaveProperty("refreshToken");
  //     // expect(res.body.data).toHaveProperty("user");
  //     // expect(res.body.data.user).toHaveProperty("_id");
  //     // expect(res.body.data.user).toHaveProperty("name");
  //     // expect(res.body.data.user).toHaveProperty("email");
  //     // expect(res.body.message).toBe("user successfully created");

  //     done();
  //   });
});

describe("POST /login", () => {
  //throw an error if there is no token from google
  //succesfully login user
  it("should send an error if empty body is sent", async (done) => {
    const res = await headers(request.post("/login").send({}));
    expect(res.status).toBe(httpStatus.BAD_REQUEST);
    done();
  });
  it("should send an error if the token is expired", async (done) => {
    const res = await headers(
      request.post("/login").send({
        token:
          " ya29.A0AfH6SMB_r_TDEZJE4AjgzrGRheJj_xMEnbzBIAr2YPU2M7j-9_8-682557ELXXyBefaqe0O7qfp1vP6vrF6E7ydqDcZdUkRMFnXxGhVWd9zFVnHCL_xqQzbz50PME-oeqm836sJcXdzLZBsCC7JJ-BVrsD6A-uLP8y7GX-cS0K0",
      })
    );

    expect(res.status).toBe(httpStatus.UNAUTHORIZED);
    done();
  });
  it("should send an error if the token is invalid", async (done) => {
    const res = await headers(
      request.post("/login").send({
        token:
          " ya29.A0AfH6SMB_r_TDEZJE4AjgzrGRheJj_xMEnbzBIAr2YPU2M7j-9_8-682557ELXXyBefaqe0O7qfp1vP6vrF6E7ydqDcZdUkRMFnXxGhVWd9zFVnHCL_xqQzbz50PME-oeqm836sJcXdzLZBsCC7JJ-BVrsD6A-uLP8y7GX-cS",
      })
    );
    expect(res.status).toBe(httpStatus.UNAUTHORIZED);
    done();
  });
  it("should send an error without authorization header", async (done) => {
    const res = await headers(
      request.post("/login").send({
        token:
          " ya29.A0AfH6SMB_r_TDEZJE4AjgzrGRheJj_xMEnbzBIAr2YPU2M7j-9_8-682557ELXXyBefaqe0O7qfp1vP6vrF6E7ydqDcZdUkRMFnXxGhVWd9zFVnHCL_xqQzbz50PME-oeqm836sJcXdzLZBsCC7JJ-BVrsD6A-uLP8y7GX-cS",
      })
    );

    expect(res.body.message).toBe(
      "Missing token header. Unable to authenticate request"
    );
    expect(res.statusCode).toBe(httpStatus.UNAUTHORIZED);
    done();
  });
  //needs a token from google
  //   it("should send success for valid token", async (done) => {
  //     const res = await request
  //       .post("/login")
  //       .send({
  //         token:
  //           " ya29.a0AfH6SMC1AY5SbM6fj4rc4KvPAieC1h_otKnU_wrN78yip3LpbVmGS0RCemkS4nqhwhfOaOmHh4W2Ivjk6IxUw4ot8Wm7NnrBkyZtRqkPRhYMT8q5QJT-xoGyDDKb9TOWNjk-zj7dHIYemlxheG9PeQxqe6wxY25PwSsebFGgq5g",
  //       })
  //       .set("Accept", "application/json");
  //     console.log(res.body);
  //     //   expect(res.statusCode).toBe(httpStatus.OK);
  //     //   expect(res.body.status).toBe("success");
  //     //   expect(res.body.data).toHaveProperty("accessToken");
  //     //   expect(res.body.data).toHaveProperty("refreshToken");
  //     //   expect(res.body.data).toHaveProperty("user");
  //     //   expect(res.body.data.user).toHaveProperty("_id");
  //     //   expect(res.body.data.user).toHaveProperty("name");
  //     //   expect(res.body.data.user).toHaveProperty("email");
  //     //   expect(res.body.message).toBe("user successfully created");
  //   });
});
