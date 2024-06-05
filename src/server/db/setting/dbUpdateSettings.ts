import { CONS_SETTING_THEME_LIGHT } from "../../../common/constants/setting.cons";
import { SettingSchemaType } from "../../../common/types/setting.types";

export async function dbUpdateSetting(
  mongoose: any,
  userParmId: string,
  newValues: {
    theme?: string;
  }
): Promise<SettingSchemaType> {
  const Setting = mongoose.model("Setting");

  try {
    // update setting
    let setting = await Setting.fineOne({ userParmId });
    if (!setting) {
      await Setting.create({
        userParmId,
        theme: CONS_SETTING_THEME_LIGHT,
      });
      setting = await Setting.fineOne({ userParmId });
    }

    // update
    if (typeof newValues.theme === "string") {
      setting.theme = newValues.theme;
    }

    // save
    await setting.save();

    // return
    return setting;
  } catch (error) {
    throw error;
  }
}
