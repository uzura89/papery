import mongoose from "mongoose";

import { dbCreateTag } from "../../../db/tag/dbCreateTag";

export async function serveCreateTag(req: any, res: any) {
  const { userParmId } = req;
  const { id, text, color } = req.body;

  try {
    const tag = await dbCreateTag(mongoose, {
      userParmId,
      id,
      text,
      color,
    });

    return res.status(200).json({ tag });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
}
