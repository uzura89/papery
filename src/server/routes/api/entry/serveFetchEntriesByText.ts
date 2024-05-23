import mongoose from "mongoose";
import { dbFetchRecentEntries } from "../../../db/entry/dbFetchRecentEntries";

export async function servefetchEntriesByText(req: any, res: any) {
  const { userParmId } = req;
  const { text } = req.query;

  try {
    const entries = await dbFetchRecentEntries(mongoose, userParmId, text);

    return res.status(200).json({ entries });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
}
