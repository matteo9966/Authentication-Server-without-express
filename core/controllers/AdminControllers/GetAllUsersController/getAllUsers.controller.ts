import { Middleware } from "../../../../Pipeline/core/Middleware.types";
import { dbConnection } from "../../../database/database.connection";
import { GetAllUsersResponse } from "../../../models/getAllUsers/getAllUsers.response";
import _ from 'lodash';
import { DbUserClear } from "../../../models/DbUser.interface";

export const getAllUsersController: Middleware = async (request, response) => {
  const users = await dbConnection.getAllUsers();

  if (!users) {
    response.statusCode = 204;
    response.end();
    return;
  }

  const dbUsersForResponse:DbUserClear[] = _.map(users,user=>_.omit(user,['passwordDigest']));
  const body: GetAllUsersResponse = {
    users:dbUsersForResponse,
  };
  response.statusCode = 200;
  response.json(body);
};
