import { DbUser } from "../models/DbUser.interface";
import { IUserSignup } from "../models/UserSignup.interface";
import { DatabaseModel } from "./model/database.model";

export class DatabaseFacade {
    db!:DatabaseModel
    //passo un database e faro connessioni crea etc usando questo database
    constructor(db:DatabaseModel){
        this.db=db;
    } //passare un implementazione del db
    async createUser(user:DbUser){
        await this.db.saveUser(user);
    }
}