// import { readAllLessonsController } from "./core/controllers/LessonsControllers/readAllLessons.controller";
import { checkIfAuthenticatedMiddleware } from "./core/Middleware/checkIfAuthenticated.middleware";
import dotenv from 'dotenv';
// import { checkIfAuthorized } from "./core/Middleware/checkIfAuthorized.middleware";
import { jsonMiddleWare } from "./Pipeline/core/middleware/json.middleware";
import { pipelineServer } from "./Pipeline/Pipeline";
import * as https from "https";
import * as fs from "fs";
import { signupUserController } from "./core/controllers/SignupController/signup.controller";
import { emailExistsController } from "./core/controllers/ValidationControllers/emailExists.controller";
import { cookieMiddleware } from "./Pipeline/core/middleware/cookie.middleware";
import { allowCorsMiddleware } from "./Pipeline/core/middleware/cors.middleware";

import {
  logMiddlewareFactory,
  writeSteamFactory,
} from "./Pipeline/core/middleware/log.middleware";
import path from "path";
import { userController } from "./core/controllers/UserController/user.controller";
import { getFoodController } from "./core/controllers/FoodControllers/getFoodController.controller";
import { logoutController } from "./core/controllers/LogoutController/logout.controller";
import { loginController } from "./core/controllers/LoginController/login.controller";
import { jwtParseMiddleware } from "./core/Middleware/jwtParse.middleware";
import { getAllUsersController } from "./core/controllers/AdminControllers/GetAllUsersController/getAllUsers.controller";
import { checkIfAuthorized } from "./core/Middleware/checkIfAuthorized.middleware";
import { loginAsUserController } from "./core/controllers/AdminControllers/LoginAsUserController/loginAsUSer.controller";
import { AddressInfo } from "net";
import superagent from "superagent";
//creo un server https

dotenv.config();
const environment = (process.env.NODE_ENV)?.trim();
const port = environment === 'dev'? 9000 : environment === 'test'? 8999 : 8000

export const httpsServer = https.createServer({
  key: fs.readFileSync("./key.pem"),
  cert: fs.readFileSync("./cert.pem"),
});

httpsServer.on("request", (req, res) => {
  console.log("[REQUEST URL] ", req.url);
});

const pipeline = pipelineServer(httpsServer);

if(environment && environment!=='prod'){ 
  const logStream = writeSteamFactory(path.join(__dirname, "log.txt"));
  if (logStream) {
    pipeline.use(logMiddlewareFactory(logStream)); //questo è solo per lo sviluppo
    httpsServer.on("close", () => {
      logStream.close();
    });
  }
}


pipeline.use(allowCorsMiddleware);
pipeline.use(jsonMiddleWare); //l'ordine è importante questo json middleware aggiunge il metodo json al response e fa il parse del body
pipeline.use(cookieMiddleware);

pipeline.listen(port, () => {
});

pipeline.server.on('listening',()=>console.log("LISTENING ON PORT: ",(<AddressInfo>pipeline.server?.address()).port,'\n','ENVIRONMENT: ',environment))

// pipeline
//   .route("/api/lessons")
//   .get(
//     checkIfAuthenticated,
//     checkIfAuthorized(["ADMin"]),
//     readAllLessonsController
//   );
pipeline.route("/api/test").get(async (req, res) => {res.statusCode=200;res.end()}); // un endpoint solo per scrivere un test
pipeline.route("/api/signup").post(signupUserController);
pipeline.route("/api/signup/verify-email").post(emailExistsController);
pipeline.route("/api/user").get(jwtParseMiddleware, userController);
pipeline
  .route("/api/food")
  .get(jwtParseMiddleware, checkIfAuthenticatedMiddleware, getFoodController);
pipeline.route("/api/logout").post(logoutController);
pipeline.route("/api/login").post(loginController);
pipeline.route("/api/user").get(userController);
pipeline.route("/api/food").get(getFoodController);
pipeline.route("/api/logout").post(logoutController);
pipeline.route("/api/login").post(loginController);
pipeline
  .route("/api/admin/users")
  .get(
    jwtParseMiddleware,
    checkIfAuthenticatedMiddleware,
    checkIfAuthorized(["ADMIN"]),
    getAllUsersController
  );

pipeline
  .route("/api/admin/as-user")
  .post(
    jwtParseMiddleware,
    checkIfAuthenticatedMiddleware,
    checkIfAuthorized(["ADMIN"]),
    loginAsUserController
  );

  const server = httpsServer
  export {pipeline,server}

  // superagent.get(​'https://localhost:8999/api/test').trustLocalhost().then(res=>console.log(res.statusCode))