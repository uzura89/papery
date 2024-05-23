import mongoose from "mongoose";

import { dbUpdateTag } from "../../../db/tag/dbUpdateTag";

export async function serveUpdateTag(req: any, res: any) {
  const { userParmId } = req;
  const { id, newText, newColor } = req.body;

  try {
    await dbUpdateTag(mongoose, userParmId, id, newText, newColor);

    return res.status(200).json({});
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
}
