import mongoose from "mongoose";

import { dbCombineTags } from "../../../db/tag/dbCombineTags";

export async function serveCombineTags(req: any, res: any) {
  const { userParmId } = req;
  const { id, newText } = req.body;

  try {
    await dbCombineTags(mongoose, userParmId, id, newText);

    return res.status(200).json({});
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
}
