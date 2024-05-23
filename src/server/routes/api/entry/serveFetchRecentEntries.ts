import mongoose from "mongoose";
import { dbFetchRecentEntries } from "../../../db/entry/dbFetchRecentEntries";

export async function serveFetchRecentEntries(req: any, res: any) {
  const { userParmId } = req;

  try {
    const entries = await dbFetchRecentEntries(mongoose, userParmId);

    return res.status(200).json({ entries });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
}
