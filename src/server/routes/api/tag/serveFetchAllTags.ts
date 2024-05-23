import mongoose from "mongoose";

import { dbFetchAllTags } from "../../../db/tag/dbFetchAllTags";

export async function serveFetchAllTags(req: any, res: any) {
  const { userParmId } = req;

  try {
    const tags = await dbFetchAllTags(mongoose, userParmId);

    return res.status(200).json({ tags });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
}
