import { Middleware } from "../../../../Pipeline/core/Middleware.types";
import { LoginAsUserRequest } from "../../../models/loginAsUser/loginAsUser.request";
import httpErrors from "http-errors";
import { dbConnection } from "../../../database/database.connection";
import { LoginAsUserResponse } from "../../../models/loginAsUser/loginAsUser.response";
import { createJWT } from "../../../utils/jwtValidation";
export const loginAsUserController: Middleware = async (request, response) => {
  const body: LoginAsUserRequest = request.body as LoginAsUserRequest;
  if (!body?.email) {
    throw httpErrors.BadRequest("provide user email in the body");
  }

  const user = await dbConnection.findUserByEmail(body.email);
  if (!user) {
    throw httpErrors.BadRequest("no user exists with this email");
  }
  //user esiste

  const respBody: LoginAsUserResponse = {
    email: user.email,
    id: user.id,
    roles: user.roles,
    username: user.username,
  };

  const jsontoken = await createJWT(respBody);
  if(jsontoken){
    response.cookie('SESSION_ID',jsontoken,{path:'/'});
  }else{
    throw httpErrors.InternalServerError("server error while creating a session for user");
  }

  response.statusCode = 200;
  response.json(respBody);
};
