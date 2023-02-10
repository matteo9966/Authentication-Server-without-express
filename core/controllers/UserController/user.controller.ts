import { Middleware } from "../../../Pipeline/core/Middleware.types";
import { cookieNames } from "../../constants/cookies";
import { sessionManager } from "../../session-manager/session-manager";
export const userController:Middleware = async(request,response)=>{
     
    const sessionID = request.sessionId // aggiunto dal middleware precedente

    const userSession = await sessionManager.getSessions(sessionID);
    if(userSession){
        response.statusCode = 200;
        response.json(userSession?.user)
    }else{
        response.statusCode=204;
        console.log("🚀 ~ file: user.controller.ts:14 ~ constuserController:Middleware=async ~ userSession not valid")
        
        response.end()
    }

 
    // try {
    //     const cookies = request.cookies;
    //     if(!cookies[cookieNames.SESSION_ID]){
    //         throw new Error('no session valid for session id')   
    //     }
    //     const sessionID = cookies[cookieNames.SESSION_ID];
    //     const session = await sessionManager.getSessions(sessionID)
    //     if(!session){
    //         throw new Error('no valid session for this user :(');
    //     }
    //     const isValid = session.isValid();
    //     if(!isValid){
    //         await sessionManager.removeSession(session.sessionid);
    //         throw new Error('session is not Valid!')
    //     }
    //     const userlogin = session.user;
    //     response.statusCode=200;
    //     response.json(userlogin);
        
    // } catch (error) {
        
    //     console.log(" [file: user.controller.ts:21 ~ constuserController:Middleware] = async ~ error", error)
    //     response.statusCode=204; //no content
    //     response.end();
        
    // }
   //user Request prende dal body i cookies
  

}