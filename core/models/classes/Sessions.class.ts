import { generateSessionId } from "../../utils/createSession";
import { IUserLogin } from "../UserLogin.interface";
import { UserSession } from "./UserSession.class";

export class Sessions {
  sessions!: Map<string, UserSession>;
  constructor() {
    this.sessions = new Map<string, UserSession>([['1234',new UserSession('1234',{email:'m@t.it',id:'m-id',roles:["ADMIN"],username:'matteo-username'})]]);
  }

  async createSession(user: IUserLogin) {
    //user potrebbe avere più dispositivi quindi per ogni user creo una sessione
    const sessionId = await generateSessionId();
    const userSession = new UserSession(sessionId, user);
    this.sessions.set(sessionId, userSession);
    return userSession;
  }

  async removeSession(sessionId: string) {
    if (!this.sessions.has(sessionId)) {
      return false;
    }
    this.sessions.delete(sessionId);
    return true;
  }
  async getSessions(sessionId:string):Promise<UserSession | null>{
    const session = this.sessions.get(sessionId);
    if(!session) return null;
    return session
  }
}

// export const sessionManager = new Sessions(); // creo una sessione ogni volta che il system inizia