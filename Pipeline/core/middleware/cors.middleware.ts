import { Middleware } from "../Middleware.types";

export const allowCorsMiddleware:Middleware =async (request,res)=>{
    const method = request.method!;
    if (request.method === "OPTIONS") {
      res.setHeader(
        "Access-Control-Allow-Origin",
        "*"
      ); /* @dev First, read about security */
      res.setHeader("Access-Control-Allow-Methods", "OPTIONS, GET");
      res.setHeader("Access-Control-Max-Age", 2592000); // 30 days
      res.setHeader("Access-Control-Allow-Headers", "content-type");
      res.end();
      return;
    }
    if (["GET", "POST","DELETE","PATCH"].indexOf(method) > -1) {
        res.setHeader(
          "Access-Control-Allow-Origin",
          "*"
        ); /* @dev First, read about security */
        res.setHeader("Access-Control-Allow-Methods", "OPTIONS, GET, POST, DELETE");
        res.setHeader("Access-Control-Max-Age", 2592000); // 30 days
        res.setHeader(
          "Access-Control-Allow-Headers",
          "Origin, X-Requested-With, Content-Type, Accept"
        );
        return;
      }


}

// hallowCors(request: http.IncomingMessage, res: http.ServerResponse) {
//     const method = request.method!;
//     if (request.method === "OPTIONS") {
//       res.setHeader(
//         "Access-Control-Allow-Origin",
//         "*"
//       ); /* @dev First, read about security */
//       res.setHeader("Access-Control-Allow-Methods", "OPTIONS, GET");
//       res.setHeader("Access-Control-Max-Age", 2592000); // 30 days
//       res.setHeader("Access-Control-Allow-Headers", "content-type");
//       res.end();
//       return;
//     }

//     if (["GET", "POST"].indexOf(method) > -1) {
//       res.setHeader(
//         "Access-Control-Allow-Origin",
//         "*"
//       ); /* @dev First, read about security */
//       res.setHeader("Access-Control-Allow-Methods", "OPTIONS, GET");
//       res.setHeader("Access-Control-Max-Age", 2592000); // 30 days
//       res.setHeader(
//         "Access-Control-Allow-Headers",
//         "Origin, X-Requested-With, Content-Type, Accept"
//       );
//       return;
//     }
//   }