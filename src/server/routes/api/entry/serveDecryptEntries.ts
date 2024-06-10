import mongoose from "mongoose";

import { dbDecryptEntries } from "../../../db/entry/dbDecryptEntries";
import { dbUpdateSetting } from "../../../db/setting/dbUpdateSettings";

export async function serveDecryptEntries(req: any, res: any) {
  const { userParmId } = req;

  try {
    // decrypt entries
    await dbDecryptEntries(mongoose, { userParmId });
    // update setting
    await dbUpdateSetting(mongoose, userParmId, {
      textSearchEnabled: true,
    });

    return res.status(200).json({});
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
}
