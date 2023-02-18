import { UserRoles } from "../constants/user-roles";

export interface DbUser {
    id:string;
    email:string;
    passwordDigest:string,
    roles: Array<keyof typeof UserRoles>,
    username:string,
}

export type DbUserClear = Omit<DbUser,"passwordDigest">