import { Middleware } from "../../../Pipeline/core/Middleware.types";
import { db } from "../../database/database";
import createHttpError from "http-errors";
export const readAllLessonsController:Middleware = async (request,response)=>{
    try {
        const lessons = await db.readAllLessons();
        response.statusCode= 200;
        response.json(lessons)
    } catch (error) {
        let message:string="";
        if(error instanceof Error){
            message = 'message' in error ? error.message :"read all lessons error" 
            throw createHttpError.InternalServerError(message)
        }
        throw createHttpError.InternalServerError()
    }


}