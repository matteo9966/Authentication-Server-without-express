import { readAllLessonsController } from "./core/controllers/LessonsControllers/readAllLessons.controller";
import { checkIfAuthenticated } from "./core/Middleware/checkIfAuthenticated.middleware";
import { checkIfAuthorized } from "./core/Middleware/checkIfAuthorized.middleware";
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
import { sessionMiddleware } from "./core/Middleware/session.middleware";
import { getFoodController } from "./core/controllers/FoodControllers/getFoodController.controller";
import { logoutController } from "./core/controllers/LogoutController/logout.controller";
//creo un server https
const httpsServer = https.createServer({
  key: fs.readFileSync("./key.pem"),
  cert: fs.readFileSync("./cert.pem"),
});

httpsServer.on("request", (req, res) => {
  console.log("[REQUEST URL] ", req.url);
});

const pipeline = pipelineServer(httpsServer);
const logStream = writeSteamFactory(path.join(__dirname, "log.txt"));
if (logStream) {
  pipeline.use(logMiddlewareFactory(logStream)); //questo è solo per lo sviluppo
  httpsServer.on("close", () => {
    logStream.close();
  });
}
pipeline.use(allowCorsMiddleware);
pipeline.use(jsonMiddleWare); //l'ordine è importante questo json middleware aggiunge il metodo json al response e fa il parse del body
pipeline.use(cookieMiddleware);

pipeline.listen(9000, () => {
  console.log("listening on 9000");
});

pipeline
  .route("/api/lessons")
  .get(
    checkIfAuthenticated,
    checkIfAuthorized(["ADMin"]),
    readAllLessonsController
  );
pipeline.route("/api/signup").post(signupUserController);
pipeline.route("/api/user").get(async (req, res) => res.end());
pipeline.route("/api/signup/verify-email").post(emailExistsController);
pipeline.route("/api/user").get(sessionMiddleware,userController);
pipeline.route("/api/food").get(sessionMiddleware,getFoodController);
pipeline.route("/api/logout").post(logoutController)
