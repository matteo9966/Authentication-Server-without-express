import {IncomingMessage,ServerResponse}  from "http";

declare module 'http' {
     interface IncomingMessage {
         body:Record<string,any>
         cookie:record<string,string>
         user:any //TODO: aggiungere i dettagli del user

     }

      interface ServerResponse {
        json:(data:Record<string,any>|string)=>void
     }


 }