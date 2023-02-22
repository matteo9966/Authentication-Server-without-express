import { Middleware } from "../../../Pipeline/core/Middleware.types";
import cookie from "cookie";
import _ from "lodash";
import httpErrors from "http-errors";
import { verifyRefreshToken } from "../../utils/jwtRefresh";
import { dbConnection } from "../../database/database.connection";
import { createTokenPayloadFromDBuser } from "../../utils/createPayloadFromSessionToken";
import { createJWT } from "../../utils/jwtValidation";
export const refreshController: Middleware = async (request, response) => {
  //prendo il SESSION_ID dal cookie,
  //se non è valido gliene mando uno nuovo
 
  const cookies = cookie.parse(request.headers.cookie || "");
  
  if (!_.has(cookies, "SESSION_ID")) {
    response.statusCode = 206;
    response.statusMessage="missing SESSION_ID"
     response.write("missing SESSION_ID");
     
     response.end();
     return
  }
  if (!_.has(cookies, "REFRESH_TOKEN")) {
    response.statusCode = 206;
    response.statusMessage="missing REFRESH_TOKEN";
    console.log('mssigng refresh tok')
    response.setHeader('Content-Type','text/plain')
     response.write("missing REFRESH_TOKEN");
     response.end();
     return
  }

  const body = request.body;
  const email = _.has(body, "email") ? body.email : null;
  if (!email) {
    throw httpErrors.BadRequest("Missing email property in body");
  }

  const sessionID = cookies["SESSION_ID"];
  const refreshToken = cookies["REFRESH_TOKEN"];

  try {
    const payload = await verifyRefreshToken(refreshToken);
    if (!_.has(payload, "email")) {
      throw new Error("refresh token payload malformed");
    }

    const email = (<Record<string, string>>payload).email;

    const user = await dbConnection.findUserByEmail(email);
    if (!user) {
      throw new Error("no user with email provided in refresh token");
    }


    const sessionIdPayload = createTokenPayloadFromDBuser(user);

    const sessionToken  = await createJWT(sessionIdPayload);

    response.cookie('SESSION_ID',sessionToken||"");
    response.cookie('REFRESH_TOKEN',refreshToken||"");
    response.statusCode=201;
   
    response.end();
    
    //ora devo creare il nuovo sessionId
  } catch (error) {

    console.log(error);
    if (error instanceof Error) {
      throw httpErrors.BadRequest(error.message);
    } else {
      throw httpErrors.InternalServerError(
        "error while parsing the refresh token"
      );
    }
  }
};
