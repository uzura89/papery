import mongoose from "mongoose";
import { dbCreateBlankEntry } from "../../../db/entry/dbCreateBlankEntry";

export async function serveCreateEntry(req: any, res: any) {
  const { userParmId } = req;
  const { id, body, date } = req.body;

  try {
    const entry = await dbCreateBlankEntry(mongoose, {
      userParmId,
      id,
      body,
      date,
    });

    return res.status(200).json({ id: entry.id });
  } catch (error) {
    return res.status(500).json({
      message:
        "Failed to save the entry. Before loosing the entry, please copy & paste it to somewhere and refresh this page.",
    });
  }
}
