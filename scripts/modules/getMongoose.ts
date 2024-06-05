import mongoose from "mongoose";

import { getLocalEnv } from "../../src/server/modules/env/getLocalEnv";
import Models from "../../src/server/models/index";

export function getMongoose() {
  try {
    // get DB_URI from .env
    const { DB_URI } = getLocalEnv();
    mongoose.connect(DB_URI as string);

    // load models
    Models(mongoose);

    // return mongoose
    return mongoose;
  } catch (err) {}
}
