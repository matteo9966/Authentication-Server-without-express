process.env.NODE_ENV = "test";
import chai, { expect } from "chai";
import superagent from "superagent";
import { httpsServer } from "../../../server";
import { createServer } from "http";


const base = "​https://localhost:8999";

describe("my first API test /test", function () {
  describe("GET /api/test", function () {
    it("should return status code 200",async function () {
      const response = await superagent.get(​'http://localhost:8999/api/test').trustLocalhost()
      expect(response.statusCode).to.equal(200)
    });

    

  });
});


