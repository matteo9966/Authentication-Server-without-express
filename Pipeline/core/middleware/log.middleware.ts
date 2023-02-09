import { Middleware } from "../Middleware.types";
import fs from 'fs';
import path from "path";
import moment from "moment";
import appRootDir from 'app-root-dir'
import _ from 'lodash';
export function logMiddlewareFactory(fsWriteStream:fs.WriteStream):Middleware{
    
     //keep a file open
      
     
     const logMiddleware:Middleware = async(request,response)=>{
              try {
                const url = request.url
                const cookies = request.cookies;
                const headers = request.headers
                const date = moment().toString();
                const log = `[${date}]\n[${url}]\nCookies:\n[${cookies||''}]\nHeaders:\n[${(_.toPairs(headers).join('\r\n'))}]\n|--------------END------------|\n`
                 fsWriteStream.write(log,(err)=>{
                    if(err){
                        console.log('errore-write-stream:',err)
                    }
                })

              } catch (error) {
                  console.log('[logMiddleware error]:',error)
              }    
    }

    return logMiddleware
    
}
const rootDir = appRootDir.get(); //TODO rimuovi la libreria approotdir

export const writeSteamFactory = (file:string)=>{
    try {
        const logStream = fs.createWriteStream(file,{flags:'a'})
        return logStream
        
    } catch (error) {
        return null
    }
  
}
