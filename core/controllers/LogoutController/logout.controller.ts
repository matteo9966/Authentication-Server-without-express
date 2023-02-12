import { Middleware } from "../../../Pipeline/core/Middleware.types";
import { sessionManager } from "../../session-manager/session-manager";
export const logoutController:Middleware = async (request,response)=>{
    const cookies = request.cookies
    let removed = false;
    console.log({cookies})
    if("SESSION_ID" in cookies){
        //prendo quel session id e lo rimuovo dal db
      removed = await sessionManager.removeSession(cookies['SESSION_ID'])
      
    }
    if(removed){
        response.statusCode=200;
        response.clearcookie('SESSION_ID');
        response.end();
        console.log('user logged out succesfully')
        return
    }else{
       response.statusCode=204;
       response.end();
       console.log('didnt find user')
    }
}