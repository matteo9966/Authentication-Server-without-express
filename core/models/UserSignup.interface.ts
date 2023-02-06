import {UserRoles} from '../constants/user-roles';
import { IUser } from './User.interface';
export interface IUserSignup extends IUser{
   password:string;
}