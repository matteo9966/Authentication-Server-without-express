import { Middleware } from "../../Pipeline/core/Middleware.types";

export const checkIfAuthenticated:Middleware = async(request,response)=>{
    return true // questi middleware possono interrompere il pipeline oppure lanciare un errore che viene gestito dal errorPipeline
}