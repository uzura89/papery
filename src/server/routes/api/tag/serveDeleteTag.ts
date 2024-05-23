import mongoose from "mongoose";

import { dbDeleteTag } from "../../../db/tag/dbDeleteTag";

export async function serveDeleteTag(req: any, res: any) {
  const { userParmId } = req;
  const { id } = req.body;

  try {
    await dbDeleteTag(mongoose, userParmId, id);

    return res.status(200).json({});
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
}
