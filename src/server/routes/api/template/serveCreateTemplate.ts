import mongoose from "mongoose";
import { dbUpsertTemplate } from "../../../db/template/dbUpsertTemplate";

export async function serveCreateTemplate(req: any, res: any) {
  const { userParmId } = req;
  const { id, name, bodies } = req.body;

  try {
    await dbUpsertTemplate(mongoose, userParmId, {
      id,
      name,
      bodies,
      index: 0,
    });

    return res.status(200).json({});
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
}
