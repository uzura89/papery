import mongoose from "mongoose";

import { dbDeleteTemplate } from "../../../db/template/dbDeleteTemplate";

export async function serveDeleteTemplate(req: any, res: any) {
  const { userParmId } = req;
  const { id } = req.body;

  try {
    await dbDeleteTemplate(mongoose, userParmId, id);

    return res.status(200).json({});
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
}
