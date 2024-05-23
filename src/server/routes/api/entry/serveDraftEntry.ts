import mongoose from "mongoose";
import { dbDraftEntry } from "../../../db/entry/dbDraftEntry";

export async function serveDraftEntry(req: any, res: any) {
  const { userParmId } = req;
  const { id } = req.body;

  try {
    const entry = await dbDraftEntry(mongoose, {
      userParmId,
      id,
    });

    return res.status(200).json({ entry });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
}
