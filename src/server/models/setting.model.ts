import { CONS_SETTING_THEME_LIGHT } from "../../common/constants/setting.cons";

export default function (mongoose: any) {
  const { Schema } = mongoose;

  // define Entry Schema
  const SettingSchema = new Schema({
    userParmId: {
      type: String,
      required: "userParmId is required",
    },
    theme: {
      type: String,
      default: CONS_SETTING_THEME_LIGHT,
    },
    textSearchEnabled: {
      type: Boolean,
      default: false,
    },
    created: {
      type: Date,
      default: Date.now,
    },
  });

  // index with userParmId
  SettingSchema.index({ userParmId: 1 });

  // define Setting model using SettingSchema
  mongoose.model("Setting", SettingSchema);
}
