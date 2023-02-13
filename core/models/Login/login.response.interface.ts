import { IUser } from "../User.interface";

export interface IUserLoginResponse extends IUser{
    id:string;
}