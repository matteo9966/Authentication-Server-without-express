import { JsonDB, Config } from "node-json-db";
import { DbUser } from "../../models/DbUser.interface";
import { DatabaseModel } from "../model/database.model";

export class JSONDB implements DatabaseModel {
  config!: Config;
  db!: JsonDB;
  userBase = `/user`;
  constructor() {
    this.config = new Config("json-database", true, true, "/");
    this.db = new JsonDB(this.config);
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
