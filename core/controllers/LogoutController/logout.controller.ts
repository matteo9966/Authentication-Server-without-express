import { Middleware } from "../../../Pipeline/core/Middleware.types";
export const logoutController:Middleware = async (request,response)=>{
    response.end();
}