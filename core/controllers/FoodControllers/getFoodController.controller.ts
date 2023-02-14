import { Middleware } from "../../../Pipeline/core/Middleware.types";
import { dbConnection } from "../../database/database.connection";
import { GetFoodResponse } from "../../models/classes/GetFoodResponse.interface";
import httpErrors from 'http-errors';
export const getFoodController:Middleware = async (request,response)=>{

    const user = request.user;
    if(!Boolean(user)){
        throw httpErrors.Unauthorized('you are not authorized')
    }
    const food = await dbConnection.getAllFood();
    if(!food){
        response.statusCode = 204
        response.end()
        return
    }
    const responseBody:GetFoodResponse = {
        food
    }
    response.statusCode=200;
    response.json(responseBody)
}