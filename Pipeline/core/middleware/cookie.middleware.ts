import { Middleware } from "../Middleware.types";
import cookie from "cookie";
import { ServerResponse } from "http";
const cookieFactory = (response: ServerResponse) => {
  const cookiefn = (
    name: string,
    value: string,
    options?: cookie.CookieSerializeOptions | undefined
  ) => {
    response.setHeader("Set-Cookie", cookie.serialize(name, value, options));
  };
  const clearcookie = (cookiename: string) => {
    response.cookie(cookiename, "", { maxAge: 0, expires: new Date() });
  };

  return {cookiefn,clearcookie};
};

export const cookieMiddleware: Middleware = async (request, response) => {
  //1 vedo se il request ha dei cookie
  const requestCookies = request?.headers?.cookie;
  if (requestCookies) {
    const parsedCookies = cookie.parse(requestCookies);
    request.cookies = parsedCookies;
  }

  const cookieFn = cookieFactory(response);
  response.cookie = cookieFn.cookiefn;
  response.clearcookie =cookieFn.clearcookie;
};

/* 
TODO:


  handleRequestCookies(request: http.IncomingMessage) {
    const cookies = request?.headers?.cookie;
    if (!cookies) return null; // voglio avere l'oggetto con i cookie
    return cookie.parse(cookies);
  }

  setRefreshToken(response: http.ServerResponse, refreshT: string) {
    response.setHeader("withCredentials", "true");
    response.setHeader(
      "Set-Cookie",
      cookie.serialize("rjwt", refreshT, {
        sameSite: "none",
        maxAge: 2 * 60 * 60 * 24,
        httpOnly: true,
        secure: true,
      })
    );
  }


*/
