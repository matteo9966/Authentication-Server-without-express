import { Middleware } from "../../../Pipeline/core/Middleware.types";
import { IUserSignup } from "../../models/UserSignup.interface";
import createHttpError from "http-errors";
import { validatePassword } from "../../utils/validatePassword";
import _ from "lodash";
import { IUserLogin } from "../../models/UserLogin.interface";
export const signupUserController: Middleware = async (request, response) => {
  const userSignup: IUserSignup = request.body as IUserSignup;
  if (
    userSignup &&
    (!userSignup.email || !userSignup.password || !userSignup.username)
  ) {
    throw createHttpError.BadRequest(
      "signup error,provide email password and username"
    );
  }
  const passwordValidationErrors = validatePassword(
    userSignup.password
  ) as Record<string, any>[];
  if (
    passwordValidationErrors &&
    passwordValidationErrors?.length &&
    passwordValidationErrors?.length > 0
  ) {
    const errorMessage = _.replace(
      _.join(_.keys(_.keyBy(passwordValidationErrors, "message")), "\r\n"),
      /string/gi,
      "password"
    );
    throw createHttpError.BadRequest(errorMessage);
  }

  const newUser:IUserLogin = {
    email:userSignup.email,
    id:Math.random().toString(36).slice(2),
    roles:['USER'],
    username:userSignup.username
  } 

  //TODO: email esiste già
  //TODO: formato email non valido

  
  

  response.json(newUser)

};
