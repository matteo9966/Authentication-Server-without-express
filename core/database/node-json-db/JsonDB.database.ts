import { JsonDB, Config } from "node-json-db";
import { DBFood } from "../../models/DbFood.interface";
import { DbUser } from "../../models/DbUser.interface";
import { DatabaseModel } from "../model/database.model";
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
    try {
      const user = await this.db.getData(`${this.userBase}/${email}`);
      return user;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async saveUser(user: DbUser) {
    const email = user.email;
    this.db.push(`${this.userBase}/${email}`, user); //ordino per email
  }

  async updateUser(user: DbUser) {}

  async deleteUser(user: DbUser) {}

  async patchUser(user: DbUser) {}
}
