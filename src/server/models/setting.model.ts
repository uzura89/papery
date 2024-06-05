export default function (mongoose: any) {
  const { Schema } = mongoose;

  // define Entry Schema
  const SettingSchema = new Schema({
    userParmId: {
      type: String,
      required: "userParmId is required",
    },
    languageDirection: {
      type: String,
      default: "ltr",
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
