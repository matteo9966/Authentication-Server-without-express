import { Middleware } from "../../../Pipeline/core/Middleware.types";
export const userController:Middleware = async(request,response)=>{
    const user = request.user;
    if(!user){
        response.statusCode=204;
        response.end()
    }else{
        response.statusCode=200
        response.json(user);
     }

  

}