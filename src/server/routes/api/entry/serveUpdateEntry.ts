import mongoose from "mongoose";

import { dbUpdateEntry } from "../../../db/entry/dbUpdateEntry";

export async function serveUpdateEntry(req: any, res: any) {
  const { userParmId } = req;
  const { id, body, date } = req.body;

  try {
    const entry = await dbUpdateEntry(
      mongoose,
      {
        userParmId,
        id,
      },
      {
        body,
        date,
      }
    );

    return res.status(200).json({ entryId: entry.id });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
}
