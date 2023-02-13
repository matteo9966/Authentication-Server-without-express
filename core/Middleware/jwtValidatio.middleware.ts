import { Middleware } from "../../Pipeline/core/Middleware.types";
import httpErrors from "http-errors";
import { verifyJWT } from "../utils/jwtValidation";
import { JwtPayload } from "jsonwebtoken";
import _ from "lodash";
import { IUserLoginResponse } from "../models/Login/login.response.interface";


//TODO: questo dovrebbe prendere solo il session id e aggiungere il payload al request, crea un altro middleware per l'authentication
export const jwtValidationMiddleware: Middleware = async (request, respone) => {
    const cookies = request.cookies;
    const jwt =_.has(cookies, 'SESSION_ID')? request?.cookies["SESSION_ID"] : null;
  if (!jwt) {
    throw httpErrors.Unauthorized("no session id provided");
  }

  try {
    const payload = await verifyJWT(jwt);
    console.log("🚀 ~ file: jwtValidatio.middleware.ts:16 ~ constjwtValidationMiddleware:Middleware= ~ payload", payload)
    
    if (payload && typeof payload !== "string") {
      const userLoginResponse = createPayloadFromToken(payload);
      if (userLoginResponse.email.length === 0) {
        throw new Error("wrong jwt payload format");
      }

      request.user = userLoginResponse;
      return; // il prossimo middleware avrà user
    } else {
      throw new Error("wrong jwt format");
    }
  } catch (error) {
    if (error instanceof Error) {
      if (error.message) {
        throw httpErrors.BadRequest(error.message);
      }
    } else throw httpErrors.Unauthorized("jwt error");
  }

  respone.end();
};

function createPayloadFromToken(payload: JwtPayload) {
  const loginResponse: IUserLoginResponse = {
    email: _.has(payload, "email") ? payload["email"] : "",
    id: _.has(payload, "id") ? payload["id"] : "",
    roles: _.has(payload, "roles") ? payload["roles"] : "",
    username: _.has(payload, "username") ? payload["username"] : "",
  };
  return loginResponse;
}
