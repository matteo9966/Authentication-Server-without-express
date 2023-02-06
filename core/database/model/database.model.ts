import { DbUser } from "../../models/DbUser.interface";

export interface DatabaseModel {
   saveUser(user:DbUser):Promise<any>
   updateUser(user:DbUser):Promise<any>
   deleteUser(user:DbUser):Promise<any>
   patchUser(user:DbUser):Promise<any>
}