import {IncomingMessage,ServerResponse}  from "http";
import cookie from 'cookie'
declare module 'http' {
     interface IncomingMessage {
         body:Record<string,any>
         cookies:record<string,string>
         user:any //TODO: aggiungere i dettagli del user

     }

      interface ServerResponse {
        json:(data:Record<string,any>|string)=>void
        cookie:(name:string,valude:string,options?:cookie.CookieSerializeOptions|undefined)=>void //passa 
     }


 }