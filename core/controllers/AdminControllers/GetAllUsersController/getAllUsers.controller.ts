import { Middleware } from "../../../../Pipeline/core/Middleware.types";
import { dbConnection } from "../../../database/database.connection";
import { GetAllUsersResponse } from "../../../models/getAllUsers/getAllUsers.response";
export const getAllUsersController: Middleware = async (request, response) => {
  const users = await dbConnection.getAllUsers();

  if (!users) {
    response.statusCode = 204;
    response.end();
    return;
  }
  const body: GetAllUsersResponse = {
    users,
  };
  response.statusCode = 200;
  response.json(body);
};
