import { dbFetchSettings } from "../../../db/setting/dbFetchSettings";

export async function serveFetchSetting(req: any, res: any) {
  const { userParmId } = req;

  try {
    const setting = await dbFetchSettings(req.mongoose, userParmId);

    return res.status(200).json({ setting });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
}
