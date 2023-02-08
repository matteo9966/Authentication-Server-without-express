import { generateSessionId } from "../../utils/createSession";
import { IUserLogin } from "../UserLogin.interface";
import { UserSession } from "./UserSession.class";

class Sessions {
  sessions!: Map<string, UserSession>;
  constructor() {
    this.sessions = new Map<string, UserSession>();
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
}

export const sessionManager = new Sessions(); // creo una sessione ogni volta che il system inizia