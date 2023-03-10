import { Middleware } from "../Middleware.types";
import fs from "fs";
import path from "path";
import moment from "moment";
import _ from "lodash";
export function logMiddlewareFactory(
  fsWriteStream: fs.WriteStream
): Middleware {
  //keep a file open

  const logMiddleware: Middleware = async (request, response) => {
      let resp = ""; 
    request.on("data", (data) => {
     resp =  resp + data.toString();
    });

    request.on("end", () => {
      try {
        const url = request.url;
        const cookies = request.cookies;
        const headers = request.headers;
        const date = moment().toString();

        const log = `[${date}]\n[${url}]\nCookies:\n[${
          cookies || ""
        }]\nHeaders:\n[${_.toPairs(headers).join("\r\n")}]\n\nBODY \n
          ${resp}\n
                    
                    |--------------END------------|\n`;
        fsWriteStream.write(log, (err) => {
          if (err) {
            console.log("errore-write-stream:", err);
          }
        });
      } catch (error) {
        console.log("[logMiddleware error]:", error);
      }
    });
  };

  return logMiddleware;
}

export const writeSteamFactory = (file: string) => {
  try {
    const logStream = fs.createWriteStream(file, { flags: "a" });
    return logStream;
  } catch (error) {
    return null;
  }
};
