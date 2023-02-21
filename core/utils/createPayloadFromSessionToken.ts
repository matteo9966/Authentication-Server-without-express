import { JwtPayload } from "jsonwebtoken";
import _ from "lodash";
import { DbUser } from "../models/DbUser.interface";
import { IUserLoginResponse } from "../models/Login/login.response.interface";

function createPayloadFromToken(payload: JwtPayload) {
  const loginResponse: IUserLoginResponse = {
    email: _.has(payload, "email") ? payload["email"] : "",
    id: _.has(payload, "id") ? payload["id"] : "",
    roles: _.has(payload, "roles") ? payload["roles"] : "",
    username: _.has(payload, "username") ? payload["username"] : "",
  };
  return loginResponse;
}

export function createTokenPayloadFromDBuser(user: DbUser) {
  const sessionIDTokenPayload: IUserLoginResponse = {
    email: user.email,
    id: user.id,
    roles: user.roles,
    username: user.username,
  };
  return sessionIDTokenPayload;
}
