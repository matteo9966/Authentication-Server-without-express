import { expect } from "chai";
import { httpsServer } from "./server";
import supertest from "supertest";
import { createRefreshToken } from "./core/utils/jwtRefresh";
import { createJWT } from "./core/utils/jwtValidation";
import * as testconfig from './test-config';


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
      const response = await testconfig.postRefresh()
        .set("Cookie", ["SESSION_ID=1234"]);
      expect(response.status).to.equal(206);
    });

    it("should return badRequest if REFRESH_TOKEN doesnt have email in payload", async function () {
      const response = await testconfig.postRefresh()
        .set("Cookie", [`SESSION_ID=1234;REFRESH_TOKEN=${INVALID_REFRESH}`]);
      expect(response.status).to.equal(400);
    });

    it("should return bad request if email in refresh token payload doesnt exist", async function () {
      const refreshToken = await createRefreshToken("not-valid-email");
      const response = await testconfig.postRefresh()
        .set("Cookie", [`SESSION_ID=1234;REFRESH_TOKEN=${refreshToken}`]);
      expect(response.status).to.equal(400);
    });
  
    it("should return a valid token if correct email is provide in body and in refresh token payload", async function () {
      const refreshToken = await createRefreshToken("test@test.it");
      const response = await testconfig.postRefresh()
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

  describe('GET /api/whoami',function(){
       it('should return unauthorized error if no SESSION_ID is provided',async function(){
          const response = await testconfig.getWhoami();
          expect(response.status).to.equal(401);

       })

       it('should return a valid user if i provide a valid SESSION_ID',async function(){
         const jwt = await createJWT(testconfig.MOCK_USER);
         if(!jwt) throw new Error('jwt not created');
         const response = await testconfig.getWhoami().set('Cookie',[`SESSION_ID=${jwt}`])
         expect(response.status).to.equal(200);
         expect(response.body).to.deep.include(testconfig.MOCK_USER) 

       })
  })

});
