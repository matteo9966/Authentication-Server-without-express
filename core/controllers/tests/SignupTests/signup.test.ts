process.env.NODE_ENV = "test";
import chai, { expect } from "chai";
import { ServerResponse } from "http";
import superagent, { ResponseError } from "superagent";


//TODO replace superagent with supertest

const base = "​http://localhost:8999";

describe("API test /api/signup", function () {
  describe("POST /api/test", function () {
    it("should return status code 200", async function () {
      const response = await superagent
        .post("http://localhost:8999/api/signup")
        .trustLocalhost()
        .send({
          email: `${Math.random().toString(36).slice(2)}@random.it`,
          password: "Secret1",
          username: "random-user",
        });
      expect(response.statusCode).to.equal(200);
    });

    it("should have user role,id,username,email",async function(){
        const response = await superagent
        .post("http://localhost:8999/api/signup")
        .trustLocalhost()
        .send({
          email: `${Math.random().toString(36).slice(2)}@random.it`,
          password: "Secret1",
          username: "random-user",
        });
      expect(response.body).to.not.be.null
      expect(response.body).to.have.property('email');
      expect(response.body).to.have.property('id');
      expect(response.body).to.have.property('roles');
      expect(response.body).to.have.property('username');
    })

    it("should give me a bad request on invalid email",async function(){
        try{
            const response = await superagent
            .post("http://localhost:8999/api/signup")
            .trustLocalhost()
            .send({
              email: ``,
              password: "Secret1",
              username: "random-user",
            });
        }catch(err){
          if(err instanceof Error)
          expect(err.message).to.include('Bad Request')
        }


    })
    it("should give me a bad request on already existing email ",async function(){
        try{
            const response = await superagent
            .post("http://localhost:8999/api/signup")
            .trustLocalhost()
            .send({
              email: `test@test.it`,
              password: "Secret1",
              username: "random-user",
            });
        }catch(err){
          if(err)
          expect((<any>err).response.text).to.include('test@test.it already used')
        }

    })

  });
});
