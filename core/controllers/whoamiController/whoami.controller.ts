import { Middleware } from "../../../Pipeline/core/Middleware.types";
import httpErrors from 'http-errors'
export const whoamiController:Middleware = async(request,response)=>{
    //questo deve restituirmi 401 se non è autenticato
    if(!request.user){
        throw httpErrors.Unauthorized('no jwt or no user')
    }
    else{
        response.statusCode=200;
        return response.json(request.user);
    }

}