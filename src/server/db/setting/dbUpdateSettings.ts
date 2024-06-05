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
    const setting = await Setting.fineOne({ userParmId });
    if (!setting) throw new Error("Setting not found");

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
