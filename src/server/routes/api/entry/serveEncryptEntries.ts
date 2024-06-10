import mongoose from "mongoose";

import { dbUpdateSetting } from "../../../db/setting/dbUpdateSettings";
import { dbEncryptEntries } from "../../../db/entry/dbEncryptEntries";

export async function serveEncryptEntries(req: any, res: any) {
  const { userParmId } = req;

  try {
    // decrypt entries
    await dbEncryptEntries(mongoose, { userParmId });
    // update setting
    await dbUpdateSetting(mongoose, userParmId, {
      textSearchEnabled: false,
    });

    return res.status(200).json({});
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
}
