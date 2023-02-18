import { Middleware } from "../../../Pipeline/core/Middleware.types";
export const logoutController:Middleware = async (request,response)=>{
    response.clearcookie('SESSION_ID')
    response.clearcookie('SESSION_ID')
    response.end();
}