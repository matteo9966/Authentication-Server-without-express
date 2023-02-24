import { JsonDB, Config } from "node-json-db";
import { DBFood } from "../../models/DbFood.interface";
import { DbUser } from "../../models/DbUser.interface";
import { DatabaseModel } from "../model/database.model";
import crypto from 'crypto';

const hashEmail = (email:string)=>{
 return crypto.createHash('md5').update(email).digest('hex');
}


import _ from 'lodash'
export class JSONDB implements DatabaseModel {
  config!: Config;
  db!: JsonDB;
  userBase = `/user`;
  foodBase = `/food`;
  constructor(database="json-database") {
    this.config = new Config(database, true, true, "/");
    this.db = new JsonDB(this.config);
  }
  async getAllUsers(): Promise<DbUser[] | null> {
    try {
      const users =_.values( await this.db.getData(this.userBase));
      
      if (users.length) {
        return users as DbUser[];
      }
    } catch (error) {
      console.log(error);
    }
    return null;
  }

  async getAllFood(): Promise<DBFood[] | null> {
    // throw new Error("Method not implemented.");
    try {
      const food = await this.db.getData(`${this.foodBase}`);
      return food;
    } catch (error) {
      return null;
    }
  }

  async getUserByEmail(email: string): Promise<DbUser | null> {

    //create an hash from the email and use it as the key
    const emailHash = hashEmail(email)
    try {
      console.log(`LOOKING FOR: ${this.userBase}/${emailHash}`) // fare il replace di . con __dot__ quando lo salvi nel db
      const users = await this.db.getData(`${this.userBase}/${emailHash}`.trim().toLowerCase());
      return users;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async saveUser(user: DbUser) {
    const email = user.email;
    const emailHash = hashEmail(email)
    this.db.push(`${this.userBase}/${emailHash}`, user); //ordino per email
  }

  async updateUser(user: DbUser) {}

  async deleteUser(user: DbUser) {}

  async patchUser(user: DbUser) {}
}
