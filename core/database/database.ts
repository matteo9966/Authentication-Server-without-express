import _ from "lodash";
import { LESSONS } from "./mock-data/lessons.data";
import { USERS } from "./mock-data/users.data";
import { DbUser } from "../models/DbUser.interface";
import { DbLesson } from "../models/DbLesson.interface";
//TODO: rimuovere questo database e usaere solo il databasefacade
export class Database {
  async readAllLessons() {
    return _.values(LESSONS);
  }

  async createUser(email: string, passwordDigest: string) {
    const usersPerEmail = _.keyBy(_.values(USERS), "email");
    if (usersPerEmail[email]) {
      const error = `${email} already taken by a user`;
      console.log(`${error}`);
      throw new Error(error);
    }

    //TODO: completa
  }

  async findUserByEmail() {
    //TODO: implement method
  }

  async findUserByID() {
    //TODO implement method
  }
}


export const db = new Database(); // creo un singleton