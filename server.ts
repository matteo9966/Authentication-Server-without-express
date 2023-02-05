import { readAllLessonsController } from "./core/controllers/LessonsControllers/readAllLessons.controller";
import { checkIfAuthenticated } from "./core/Middleware/checkIfAuthenticated.middleware";
import { checkIfAuthorized } from "./core/Middleware/checkIfAuthorized.middleware";
import { jsonMiddleWare } from "./Pipeline/core/middleware/json.middleware";
import { pipelineServer } from "./Pipeline/Pipeline";

const pipeline = pipelineServer();
pipeline.use(jsonMiddleWare); //l'ordine è importante questo json middleware aggiunge il metodo json al response e fa il parse del body

pipeline.listen(8000, () => {
  console.log("listening on 8000");
});

pipeline.route("/dogos").get(async (request, response) => {
  response.end("you made it :)");
});

pipeline
  .route("/api/lessons")
  .get(checkIfAuthenticated, checkIfAuthorized(["ADMin"]),readAllLessonsController);
