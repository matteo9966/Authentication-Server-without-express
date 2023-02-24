import { expect } from "chai";
import { httpsServer } from "./server";
import supertest from "supertest";
import { endpoints } from "./config/endpoints";
import { IUserLoginResponse } from "./core/models/Login/login.response.interface";
import { loginRequest } from "./core/models/Login/login.request.interface";
import { IUserSignup } from "./core/models/UserSignup.interface";

const INVALID_REFRESH =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";

export const MOCK_USER: IUserLoginResponse = {
  email: "test1@test.ti",
  id: "random-id",
  roles: ["ADMIN"],
  username: "some-random-username",
};

export const MOCK_BAD_LOGIN_USER: loginRequest = { email: "", password: "" };
export const MOCK_GOOD_LOGIN_USER: loginRequest = {
  "email":"test@test.it","password":"Secret1"
};
export const MOCK_BAD_SIGNUP_USER: IUserSignup = {
  email: "",
  password: "",
  username: "",
  roles: [],
};

export const createGoodSignupUser: () => IUserSignup = () => ({
  email: `${Math.random().toString(36).slice(2)}@test.it`,
  password: `Secret11`,
  username: `${Math.random().toString(36).slice(2)}`,
  roles: ["USER"],
});

export const MOCK_EXISTING_EMAIL_VERIFY = {
  email: "test@test.it",
};

export const createRandomEmailSignupPayload = () => ({
  email: `${Math.random().toString(36).slice(2)}@email.it`,
});

// export const getGoodSignupUserResponse:(user:IUserSignup)=>IUserLoginResponse = (user)=>{
//   return {
//     email:user.email,
//     id:'some-random-id',
//     roles:['USER'],
//     username:'some-username'
//   }
// }

const request = supertest(httpsServer);

export function postRefresh(): supertest.Test {
  return request.post(`${endpoints.BASE}${endpoints.REFRESH_URL}`);
}

export function getWhoami(): supertest.Test {
  return request.get(`${endpoints.BASE}${endpoints.WHOAMI_URL}`);
}

export function postLogin(): supertest.Test {
  return request.post(`${endpoints.BASE}${endpoints.LOGIN_URL}`);
}

export function postSignup(): supertest.Test {
  return request.post(`${endpoints.BASE}${endpoints.SIGNUP_URL}`);
}

export function postVerifyEmailSignup(): supertest.Test {
  return request.post(`${endpoints.BASE}${endpoints.VERIFY_EMAIL_URL}`);
}
