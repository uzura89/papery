import mongoose from "mongoose";

import { dbFetchAllTemplates } from "../../../db/template/dbFetchAllTemplates";

export async function serveFetchAllTemplates(req: any, res: any) {
  const { userParmId } = req;

  try {
    const templates = await dbFetchAllTemplates(mongoose, userParmId);

    return res.status(200).json({ templates });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
}
