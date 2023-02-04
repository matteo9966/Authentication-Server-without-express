import {IncomingMessage}  from "http";

declare module 'http' {
    export interface IncomingMessage {
         body?:Record<string,any>
         cookie?:record<string,string>
     }
 }