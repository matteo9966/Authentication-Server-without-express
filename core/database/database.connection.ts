//the connection to the database
import { DatabaseFacade } from "./databaseFacade";
import { JSONDB } from "./node-json-db/JsonDB.database";

const environment = process.env.NODE_ENV?.trim();
let db: JSONDB;
if (environment === "test") {
  db = new JSONDB("test-json-database.json");
} else if (environment === "dev") {
  db = new JSONDB("dev-json-database.json");
} else {
  db = new JSONDB("prod-json-database.json");
}

export const dbConnection = new DatabaseFacade(db);
