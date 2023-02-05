import { Middleware } from "../../Pipeline/core/Middleware.types";
import {IncomingMessage,ServerResponse} from 'http';
import _ from 'lodash';
import { UserRoles } from "../constants/user-roles";
import createHttpError from 'http-errors'
export function checkIfAuthorized(allowedRoles:string[]):Middleware{
 
    const middleware:Middleware = async (request,response)=>{
        return true;

        // if(!('user' in request)){
        //     throw createHttpError.InternalServerError('missing property user in body');
        // }
    
    
        
        // const user = request?.user;
        // //TODO implementare logica di user 
        
        // return true ;

        // const userRoles = user?.roles ?? [..._.keys(UserRoles)] 
        // const roles = _.intersection(userRoles,allowedRoles);
    
        // if(roles.length>0){
        //     //non fare nulla altrimenti lancia l'errore 
        // }else{
        //     //status 
        // }

    }

    return middleware
}