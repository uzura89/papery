import mongoose from "mongoose";
import { dbPublishEntry } from "../../../db/entry/dbPublishEntry";

export async function servePublishEntry(req: any, res: any) {
  const { userParmId } = req;
  const { id, body, date } = req.body;

  try {
    const entry = await dbPublishEntry(mongoose, {
      userParmId,
      id,
      body,
      date,
    });

    return res.status(200).json({ entry });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
}
