process.env.NODE_ENV = "test";
import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import { server } from "../../../server";
const base = "​https://localhost:8999";
const should = chai.should();

chai.use(chaiHttp); // un plugin di chai
const request = chai.request;

describe("/GET test - first test of http client", function () {
  it("should return status code 200", () => {
    request(base)
      .get("/api/test")
      .then((res) => expect(res).to.have.status(201));
  });
});
