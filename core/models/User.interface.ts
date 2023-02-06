import {UserRoles} from '../constants/user-roles';
export interface IUser{
   username:string;
   email:string;
   roles:Array<keyof typeof UserRoles>
}