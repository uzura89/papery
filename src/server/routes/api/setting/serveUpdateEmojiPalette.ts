import { dbUpdateSetting } from "../../../db/setting/dbUpdateSettings";
import { dbCheckIfPremiumUser } from "../../../db/user/dbCheckIfPremiumUser";

export async function serveUpdateEmojiPalette(req: any, res: any) {
  const { userParmId } = req;
  const { emojiPalette } = req.body;

  try {
    const isPremium = await dbCheckIfPremiumUser(req.mongoose, userParmId);
    if (!isPremium) {
      return res.status(403).json({
        message: "Unauthorized",
      });
    }

    const setting = await dbUpdateSetting(req.mongoose, userParmId, {
      emojiPalette,
    });

    return res.status(200).json({ emojiPalette: setting.emojiPalette });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
}
