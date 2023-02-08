//the connection to the database
import { DatabaseFacade } from "./databaseFacade";
import { JSONDB } from "./node-json-db/JsonDB.database";

export const dbConnection = new DatabaseFacade(new JSONDB());

