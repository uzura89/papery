import mongoose from "mongoose";

import { dbFetchEntryHistories } from "../../../db/entry/dbFetchEntryHistories";

export async function serveFetchEntryHistories(req: any, res: any) {
  const { userParmId } = req;
  const { year } = req.query;
  const tags = req.query.tags ? req.query.tags.split(",") : [];

  try {
    const entryHistories = await dbFetchEntryHistories(mongoose, {
      userParmId,
      year,
      tags,
    });

    return res.status(200).json({ entryHistories });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
}
