import jwt from "jsonwebtoken";
import fs from "fs";
import path from "path";
import { IUserLoginResponse } from "../models/Login/login.response.interface";
const private_key = fs.readFileSync(
  path.join(__dirname, "../../rsa-keys", "private.pem")
);
const public_key = fs.readFileSync(
  path.join(__dirname, "../../rsa-keys", "public.pem")
);
// const jwtSign = promisify(jwt.sign);
// const jwtVerify = promisify(jwt.verify);

const createJWT = (user: IUserLoginResponse) => {
  return new Promise<string | undefined>((resolve, reject) => {
    jwt.sign(
      user,
      private_key,
      { expiresIn: 100, algorithm: "RS256" }, //15 minute token
      (err, token) => {
        if (err) {
          reject(err);
        } else {
          resolve(token);
        }
      }
    );
  });
};

const verifyJWT = (token: string) => {
  return new Promise<jwt.JwtPayload|string|undefined>((resolve, reject) => {
    jwt.verify(token, private_key, {}, (err, payload) => {
      if (err) {
        return reject(err);
      } else {
        return resolve(payload);
      }
    });
  });
};

export { createJWT, verifyJWT };

//1 creare la firma

//uso solo userID per verificare se user p
