import { expect } from "chai";
import { httpsServer } from "./server";
import supertest from "supertest";
import { endpoints } from "./config/endpoints";
import { IUserLoginResponse } from "./core/models/Login/login.response.interface";

const INVALID_REFRESH =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";

export const MOCK_USER: IUserLoginResponse = {
  email: "test@test.ti",
  id: "random-id",
  roles: ["ADMIN"],
  username: "some-random-username",
};

const request = supertest(httpsServer);

export function postRefresh(): supertest.Test {
  return request.post(`${endpoints.BASE}${endpoints.REFRESH_URL}`);
}

export function getWhoami(): supertest.Test {
  return request.get(`${endpoints.BASE}${endpoints.WHOAMI_URL}`);
}
