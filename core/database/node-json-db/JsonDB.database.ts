import { JsonDB, Config } from "node-json-db";
import { DbUser } from "../../models/DbUser.interface";
import { DatabaseModel } from "../model/database.model";

export class JSONDB implements DatabaseModel {
  config!: Config;
  db!: JsonDB;
  userBase=`/user`
  constructor() {
    this.config = new Config("json-database", true, true, "/");
    this.db = new JsonDB(this.config);
  }

 

  async saveUser(user: DbUser) {
      const id= user.id
      this.db.push(`${this.userBase}/${id}`,user);
  }

  async updateUser(user: DbUser) {}

  async deleteUser(user: DbUser) {}

  async patchUser(user: DbUser) {}
}
