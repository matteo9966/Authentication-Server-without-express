import createHttpError from "http-errors";
import { Middleware } from "../../../Pipeline/core/Middleware.types";
import { dbConnection } from "../../database/database.connection";
import {
  emailExistsBodyRequest,
  emailExistsBodyResponse,
} from "../../models/emailExists.interface";
export const emailExistsController: Middleware = async (request, response) => {
  const body = request.body as emailExistsBodyRequest;
  const email = body?.email;
  const responseData: emailExistsBodyResponse = {
    exists: false,
  };
  if (!email) {
    throw createHttpError.BadRequest('no email in payload')
    return;
  }
  const user = await dbConnection.findUserByEmail(email);
  if (user) {
    responseData.exists = true;
    response.json(responseData);
    return
  }

  response.json(responseData);
};
