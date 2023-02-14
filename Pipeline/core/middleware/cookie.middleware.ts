import { Middleware } from "../Middleware.types";
import cookie from "cookie";
import _ from 'lodash';
import { ServerResponse } from "http";
const cookieFactory = (response: ServerResponse) => {
  const cookiefn = (
    name: string,
    value: string,
    options?: cookie.CookieSerializeOptions | undefined
  ) => {

    const cookies = response.getHeader("Set-Cookie")
    let responseCookies:string[] = [];
    if(cookies && _.isArray(cookies)){
      responseCookies=responseCookies.concat(cookies)
    }
    if(cookies && typeof cookies==='string'){
      responseCookies.push(cookies)
    }
   console.log(cookies,typeof cookies,_.isArray(cookies));
    response.setHeader("Set-Cookie",[...responseCookies,cookie.serialize(name, value, options)]);
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
