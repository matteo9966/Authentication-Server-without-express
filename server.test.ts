import { expect } from "chai";
import { httpsServer } from "./server";
import supertest from "supertest";
import { createRefreshToken } from "./core/utils/jwtRefresh";

const INVALID_REFRESH =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";

const agent = supertest.agent(httpsServer);
describe.only("Test all server endpoints", function () {
  describe("POST /api/refresh", function () {
    it("should return status code 206 if no SESSION_ID cookie", async function () {
      const response = await supertest(httpsServer).post("/api/refresh");
      expect(response.status).to.equal(206);
    });

    it("should return status code 206 if no REFRESH_TOKEN is in cookie", async function () {
      const response = await supertest(httpsServer)
        .post("/api/refresh")
        .set("Cookie", ["SESSION_ID=1234"]);
      expect(response.status).to.equal(206);
    });

    it("should return badRequest if REFRESH_TOKEN doesnt have email in payload", async function () {
      const response = await supertest(httpsServer)
        .post("/api/refresh")
        .set("Cookie", [`SESSION_ID=1234;REFRESH_TOKEN=${INVALID_REFRESH}`]);
      expect(response.status).to.equal(400);
    });
  });

  it("should return bad request if email in refresh token payload doesnt exist", async function () {
    const refreshToken = await createRefreshToken("not-valid-email");
    const response = await agent
      .post("/api/refresh")
      .set("Cookie", [`SESSION_ID=1234;REFRESH_TOKEN=${refreshToken}`]);
    expect(response.status).to.equal(400);
  });

  it("should return a valid token if correct email is provide in body and in refresh token payload", async function () {
    const refreshToken = await createRefreshToken("test@test.it");
    const response = await supertest(httpsServer)
      .post("/api/refresh")
      .set("Cookie", [`SESSION_ID=1234;REFRESH_TOKEN=${refreshToken}`])
      .send({
        email: "test@test.it",
      });
     expect(response.status).to.equal(201);
     expect(response.headers['set-cookie']).to.have.length(2)
     expect(response.headers['set-cookie'][0]).to.include('SESSION_ID')
    //  console.log(response.headers['set-cookie'])
     expect(response.headers['set-cookie'][1]).to.include('REFRESH_TOKEN')
  });
});
