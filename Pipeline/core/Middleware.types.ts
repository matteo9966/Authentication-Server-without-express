import {IncomingMessage,ServerResponse} from 'http'
export type Middleware =(request:IncomingMessage,response:ServerResponse)=>Promise<any>;
export type ErrorMiddleware=(error:any,request:IncomingMessage,response:ServerResponse)=>Promise<any>;