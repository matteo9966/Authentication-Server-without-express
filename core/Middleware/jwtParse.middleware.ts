import { Middleware } from "../../Pipeline/core/Middleware.types";
import httpErrors from "http-errors";
import { verifyJWT } from "../utils/jwtValidation";
import { JwtPayload } from "jsonwebtoken";
import cookie from 'cookie';
import _ from "lodash";
import { IUserLoginResponse } from "../models/Login/login.response.interface";
/**
 * @description this middleware parses the jwt payload if its valid it adds it to the response object, else it adds null
 * @param request 
 * @param respone 
 * @returns 
 */
export const jwtParseMiddleware: Middleware = async (request, respone) => {
    // const cookies = request.cookies; //qui non c'+ nulla
    const cookies = cookie.parse(request.headers.cookie||"");

    const jwt =_.has(cookies, 'SESSION_ID')? request?.cookies["SESSION_ID"] : null;
 
    let userSession:IUserLoginResponse|null=null;
  
  try {
    const payload = await verifyJWT(jwt);
    console.log(" ~ file: jwtValidatio.middleware.ts:16 ~ constjwtValidationMiddleware:Middleware= ~ payload", payload)
    
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
    //TODO_ vedere qui che fare
    // if(error instanceof Error){
    //   throw httpErrors.BadRequest(error.message)
    // }
    console.log(" ~ file: jwtParse.middleware.ts:32 ~ constjwtParseMiddleware:Middleware= ~ error: ", error)
    
    request.user=null; // va al successivo
  }
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
