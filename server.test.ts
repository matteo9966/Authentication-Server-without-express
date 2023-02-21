import { expect } from "chai";
import {httpsServer} from './server';
import supertest from "supertest";


describe.only('Test all server endpoints',function(){
  describe('GET /api/refresh',function(){

   const request = supertest(httpsServer)

    it('should return status code 206 if no SESSION_ID cookie', async function(){
     
       const response = await request.post('/api/refresh')
       expect(response.status).to.equal(206);

    })

  })
})
