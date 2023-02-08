import { Moment} from "moment";
import moment from 'moment';
import { IUserLogin } from "../UserLogin.interface";

export class UserSession {
  static readonly SESSION_DURATION = 2 * 60; //seconds
  private validUntil!: Moment;

  constructor(public sessionid: string, public user: IUserLogin){

    //quando chiamo userSession creo il validuntil

    const expires = moment().add(UserSession.SESSION_DURATION,'seconds');
    this.validUntil = expires;
    
  }

  isValid(){
    return this.validUntil.isAfter(moment())
  }

 //creo in memory session

}
