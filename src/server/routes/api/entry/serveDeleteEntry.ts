import mongoose from "mongoose";

import { dbDeleteEntry } from "../../../db/entry/dbDeleteEntry";

export async function serveDeleteEntry(req: any, res: any) {
  const { userParmId } = req;
  const { id } = req.body;

  try {
    const entryId = await dbDeleteEntry(mongoose, {
      userParmId,
      id,
    });

    return res.status(200).json({ entryId });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
}
