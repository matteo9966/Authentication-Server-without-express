import { Middleware } from "../../Pipeline/core/Middleware.types";
import {IncomingMessage,ServerResponse} from 'http';
import _ from 'lodash';
import { UserRoles } from "../constants/user-roles";
import createHttpError from 'http-errors'
export function checkIfAuthorized(allowedRoles:string[]):Middleware{
 
    const middleware:Middleware = async (request,response)=>{
        const user = request?.user;

        if(!user){
            throw createHttpError.Unauthorized('you are not authorized to access this route')
        }


        return true;



    }

    return middleware
}