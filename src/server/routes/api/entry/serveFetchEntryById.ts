import mongoose from "mongoose";

import { dbFetchEntryById } from "../../../db/entry/dbFetchEntryById";

export async function serveFetchEntryById(req: any, res: any) {
  const { userParmId } = req;
  const { id } = req.query;

  try {
    const entry = await dbFetchEntryById(mongoose, userParmId, id);

    return res.status(200).json({ entry });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
}
