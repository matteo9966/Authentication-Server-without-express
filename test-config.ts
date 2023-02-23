import { expect } from "chai";
import { httpsServer } from "./server";
import supertest from "supertest";
import { endpoints } from "./config/endpoints";

const INVALID_REFRESH =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";

const request = supertest(httpsServer);

export function postRefresh(): supertest.Test {
  return request.post(`${endpoints.BASE}${endpoints.REFRESH_URL}`);
}
