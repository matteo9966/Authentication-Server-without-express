import { Middleware } from "../../Pipeline/core/Middleware.types";
import _ from "lodash";
import createHttpError from "http-errors";
import { UserRoles } from "../constants/user-roles";
export function checkIfAuthorized(allowedRoles: (keyof typeof UserRoles)[]): Middleware {
  const middleware: Middleware = async (request, response) => {
    const user = request?.user;

    if (!user) {
      throw createHttpError.Unauthorized(
        "you are not authorized to access this route"
      );
    }
    const roles = user.roles;
    console.log({user},roles)
    if (_.intersection(roles, allowedRoles).length > 0) {
      return true;
    } else {
      throw createHttpError.Unauthorized(
        "you don t have the authorization to access this route"
      );
    }

  };

  return middleware;
}
