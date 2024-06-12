import { dbUpdateSetting } from "../../../db/setting/dbUpdateSettings";

export async function serveResetEmojiPalette(req: any, res: any) {
  const { userParmId } = req;

  try {
    const setting = await dbUpdateSetting(req.mongoose, userParmId, {
      emojiPalette: "",
    });

    return res.status(200).json({ emojiPalette: setting.emojiPalette });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
}
