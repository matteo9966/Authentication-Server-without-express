import {IncomingMessage,ServerResponse}  from "http";
import cookie from 'cookie'
import { IUserLoginResponse } from "../core/models/Login/login.response.interface";
declare module 'http' {
     interface IncomingMessage {
         body:Record<string,any>
         cookies:record<string,string>
         user:IUserLoginResponse
         _completed:boolean // un booleano che uso come flag per interrompere la catena di middleware

     }

      interface ServerResponse {
        json:(data:Record<string,any>|string)=>void
        cookie:(name:string,valude:string,options?:cookie.CookieSerializeOptions|undefined)=>void //passa 
        clearcookie:(name:string)=>void
     }


 }