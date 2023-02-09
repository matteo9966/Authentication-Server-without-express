//questo middleware aggiunge il metodo json sia al request che al response

import { Middleware } from "../Middleware.types";
import { Buffer } from "buffer";

const parseJson = (completed: Buffer) => {
  let stringified = completed.toString();
  try {
    const parsed = JSON.parse(stringified);
    return parsed;
  } catch (error) {
    console.error("[parseJSON json.middleware.ts] error", error);
  }
  return completed;
};

const stringifyData= (data:Record<string,any>|string)=>{
    try {
        const stringified = JSON.stringify(data);
        return stringified
    } catch (error) {
        console.log('[json.middleware.ts stringifyJSON] ',error);
        return null
    }
}

export const jsonMiddleWare: Middleware = async (request, response) => {
  let chunks: Buffer[] = [];
const json = (data:Record<string,any>|string)=>{
  console.log('[JSON MIDDLEWARE]',data);
    const stringified = stringifyData(data);
    if(stringified===null){
        //che faccio?
        console.log("[jsonMiddleware: stringify error] ")
        response.end("");
        return
    }
    response.setHeader("Content-Type", "application/json")
    response.end(stringified)
  }

  response.json = json

  return new Promise((resolve, reject) => {
    request.on("data", (data) => chunks.push(data));
    request.on("end", () => {
      const completed = Buffer.concat(chunks);
      //esegui solo se request ha un content type
      const contentTypeRequest = request.headers["content-type"];
      if(contentTypeRequest && contentTypeRequest.toLowerCase().includes('json')){
        const requestBody = parseJson(completed);
        request.body = requestBody;
        resolve(requestBody);
      }else {
        request.body = completed;
        resolve(completed)
      }
    });
    request.on("error", (err) => {
      console.log(["[jsonMiddleware: request error] ", err]);
    });
  });

  //aggiungiamo il json al respond method il json method pre
};
