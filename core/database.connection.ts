//the connection to the database
import { DatabaseFacade } from "./database/databaseFacade";
import { JSONDB } from "./database/node-json-db/JsonDB.database";

export const dbConnection = new DatabaseFacade(new JSONDB());

