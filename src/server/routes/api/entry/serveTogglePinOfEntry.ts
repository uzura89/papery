import mongoose from "mongoose";

import { dbTogglePinOfEntry } from "../../../db/entry/dbTogglePinOfEntry";

export async function serveTogglePinOfEntry(req: any, res: any) {
  const { userParmId } = req;
  const { id, pinned } = req.body;

  try {
    const entry = await dbTogglePinOfEntry(mongoose, {
      userParmId,
      id,
      pinned,
    });

    return res.status(200).json("ok");
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
}
