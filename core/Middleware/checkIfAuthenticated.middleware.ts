import { Middleware } from "../../Pipeline/core/Middleware.types";
import httpErrors from 'http-errors';
export const checkIfAuthenticatedMiddleware:Middleware = async(request,response)=>{
    const user = request.user;
    if(!user){
        throw  httpErrors.Unauthorized('You are not authenticated');
    }
}