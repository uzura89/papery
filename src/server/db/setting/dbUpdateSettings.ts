import { CONS_SETTING_THEME_LIGHT } from "../../../common/constants/setting.cons";
import { SettingSchemaType } from "../../../common/types/setting.types";

export async function dbUpdateSetting(
  mongoose: any,
  userParmId: string,
  newValues: {
    theme?: string;
    textSearchEnabled?: boolean;
    emojiPalette?: string;
  }
): Promise<SettingSchemaType> {
  const Setting = mongoose.model("Setting");

  try {
    // update setting
    let setting = await Setting.findOne({ userParmId });
    if (!setting) {
      await Setting.create({
        userParmId,
        theme: CONS_SETTING_THEME_LIGHT,
        textSearchEnabled: false,
      });
      setting = await Setting.findOne({ userParmId });
    }

    // update
    if (typeof newValues.theme === "string") {
      setting.theme = newValues.theme;
    }
    if (typeof newValues.textSearchEnabled === "boolean") {
      setting.textSearchEnabled = newValues.textSearchEnabled;
    }
    if (typeof newValues.emojiPalette === "string") {
      setting.emojiPalette = newValues.emojiPalette;
    }

    // save
    await setting.save();

    // return
    return setting;
  } catch (error) {
    throw error;
  }
}
