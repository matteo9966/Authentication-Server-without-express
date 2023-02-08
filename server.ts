import { readAllLessonsController } from "./core/controllers/LessonsControllers/readAllLessons.controller";
import { checkIfAuthenticated } from "./core/Middleware/checkIfAuthenticated.middleware";
import { checkIfAuthorized } from "./core/Middleware/checkIfAuthorized.middleware";
import { jsonMiddleWare } from "./Pipeline/core/middleware/json.middleware";
import { pipelineServer } from "./Pipeline/Pipeline";
import * as https from 'https';
import * as fs from 'fs';
import { signupUserController } from "./core/controllers/SignupController/signup.controller";
import { emailExistsController } from "./core/controllers/ValidationControllers/emailExists.controller";
import { cookieMiddleware } from "./Pipeline/core/middleware/cookie.middleware";


//creo un server https
const httpsServer = https.createServer({
  key:fs.readFileSync('./key.pem'),
  cert:fs.readFileSync('./cert.pem')});

  httpsServer.on('request',(req,res)=>{
    console.log('[REQUEST URL] ',req.url)
  })

const pipeline = pipelineServer(httpsServer);
pipeline.use(jsonMiddleWare); //l'ordine è importante questo json middleware aggiunge il metodo json al response e fa il parse del body
pipeline.use(cookieMiddleware);

pipeline.listen(9000, () => {
  console.log("listening on 9000");
});


pipeline.route("/api/lessons").get(checkIfAuthenticated, checkIfAuthorized(["ADMin"]),readAllLessonsController);
pipeline.route("/api/signup").post(signupUserController)
pipeline.route('/api/user').get(async(req,res)=>res.end())
pipeline.route('/api/signup/verify-email').post(emailExistsController)