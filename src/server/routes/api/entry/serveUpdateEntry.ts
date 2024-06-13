import mongoose from "mongoose";

import { dbUpdateEntry } from "../../../db/entry/dbUpdateEntry";
import { dbFetchSettings } from "../../../db/setting/dbFetchSettings";

export async function serveUpdateEntry(req: any, res: any) {
  const { userParmId } = req;
  const { id, body, date } = req.body;

  try {
    const settings = await dbFetchSettings(req.mongoose, userParmId);

    const entry = await dbUpdateEntry(
      mongoose,
      {
        userParmId,
        id,
      },
      {
        body,
        date,
      },
      {
        decryptBody: settings.textSearchEnabled,
      }
    );

    return res.status(200).json({ entryId: entry.id });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
}
