import jwt from "jsonwebtoken";
import fs from "fs";
import path from "path";

const private_key = fs.readFileSync(
  path.join(__dirname, "../../rsa-keys/refresh", "private.pem")
);
const public_key = fs.readFileSync(
  path.join(__dirname, "../../rsa-keys/refresh", "public.pem")
);

export const createRefreshToken = (email: string) => {
  return new Promise<string | undefined>((resolve, reject) => {
    jwt.sign(
      { email },
      private_key,
      { expiresIn: "1d", algorithm: "RS256" },
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

export const verifyRefreshToken = (token: string) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, private_key, (err, payload) => {
      if (err) {
        reject(err);
      } else {
        resolve(payload);
      }
    });
  });
};
