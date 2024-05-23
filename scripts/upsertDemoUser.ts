// script to call dbUpsertDemoUser

import { dbUpsertDemoUser } from "../src/server/db/demo/dbUpsertDemoUser";
import { getMongoose } from "./modules/getMongoose";

async function main() {
  try {
    const mongoose = getMongoose();
    await dbUpsertDemoUser(mongoose);

    if (mongoose) {
      mongoose.connection.close();
    }
    return;
  } catch (err) {
    console.error(err);
  }
}

main();
