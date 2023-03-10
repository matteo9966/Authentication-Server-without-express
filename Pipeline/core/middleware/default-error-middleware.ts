import { ErrorMiddleware } from "../Middleware.types";
import createHttpError from "http-errors";
// const defaultErrorMiddleware:ErrorMiddleware = (err,request,response)=>{
//     //
// }


export const httpErrorMiddleware: ErrorMiddleware = async (
  error,
  request,
  response
) => {
  if ("statusCode" in error) {
  }
  const genericError = createHttpError.InternalServerError();
  response.statusCode =
    "statusCode" in error ? error.statusCode : genericError.statusCode;
  const message =
    "message" in error
      ? error.message
      : "msg" in error
      ? error.msg
      : genericError.message;
  response.end(message);
};
