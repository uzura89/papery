import mongoose from "mongoose";
import { dbGetUserById } from "../../../db/user/dbGetUserById";

export async function serveFetchUser(req: any, res: any) {
  const { userParmId } = req;

  try {
    const user = await dbGetUserById(mongoose, { userParmId });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    return res.status(200).json({ user });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
}
