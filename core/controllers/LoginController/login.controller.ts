//il login vede se c'è un utente con quella email nel db, verifica la passowrd, se la password corrisponde restituisce un session id

import { Middleware } from "../../../Pipeline/core/Middleware.types";
import { dbConnection } from "../../database/database.connection";
import { loginRequest } from "../../models/Login/login.request.interface";
import httpError from "http-errors";
import argon2 from "argon2";
import { IUserLoginResponse } from "../../models/Login/login.response.interface";
import { createJWT } from "../../utils/jwtValidation";
import { createRefreshToken } from "../../utils/jwtRefresh";
export const loginController: Middleware = async (request, response) => {
  const requestLogin: loginRequest = request.body as loginRequest;
  if (!requestLogin?.email || !requestLogin?.password) {
    throw httpError.Unauthorized("no email or password");
  }

  //ora ho email e passwordm andiamo a cercare user
  const user = await dbConnection.findUserByEmail(requestLogin.email);
  if (!user) {
    console.log("email sbagliata");
    throw httpError.Unauthorized("wrong email or password");
  }

  //ho user

  const paswordDigest = user.passwordDigest;
  console.log(paswordDigest)
  try {
    if (await argon2.verify(paswordDigest, requestLogin.password)) {
       //restituisci lo user
    //    const IUserLoginResponse
    const loginResponse:IUserLoginResponse = {
        email:user.email,
        id:user.id,
        roles:user.roles,
        username:user.username
    }
    
    const jsontoken = await createJWT(loginResponse);
    const refreshtoken = await createRefreshToken(loginResponse.email);
    if(jsontoken && refreshtoken){
      response.cookie('SESSION_ID',jsontoken,{path:'/'});
      response.cookie('REFRESH_TOKEN',refreshtoken,{path:'/'});

    }else{
      throw new Error('errore creazione token')
    }
    response.statusCode=200;
    response.json(loginResponse)

      // password match
    } else {
      // password did not match
      console.log(requestLogin)
      throw new Error("passoword sbagliata")
    }
} catch (err) {
    // internal failure
    console.log(err)
   
    throw httpError.Unauthorized("wrong email or password");
    // throw httpError.InternalServerError("server error");
  }
};
