import { Middleware } from "../../Pipeline/core/Middleware.types";
import { cookieNames } from "../constants/cookies";
import { sessionManager } from "../session-manager/session-manager";


/**
 * @description sessionMiddleware è un middleware che restituisce subito se è stato validato altrimetni esce
 * @param request 
 * @param response 
 */
export const sessionMiddleware:Middleware = async(request,response)=>{


    try {
        const cookies = request.cookies;
        if(!cookies[cookieNames.SESSION_ID]){
            throw new Error('no session valid for session id')   
        }
        const sessionID = cookies[cookieNames.SESSION_ID];
        const session = await sessionManager.getSessions(sessionID)
        if(!session){
            throw new Error('no valid session for this user :(');
        }
        const isValid = session.isValid();
        if(!isValid){
            await sessionManager.removeSession(session.sessionid);
            throw new Error('session is not Valid!')
        }
           
        request.sessionId=sessionID

        
        
    } catch (error) {
        console.log("🚀 ~ file: session.middleware.ts:34 ~ constsessionMiddleware:Middleware=async ~ error", error)
        response.statusCode=204; //no content
        response.end();
        request._completed=true; //TODO concatenare response.end e completed in qualche modo
    }
   //user Request prende dal body i cookies
  

}