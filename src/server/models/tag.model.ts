export default function (mongoose: any) {
  const { Schema } = mongoose;

  // define Entry Schema
  const TagSchema = new Schema({
    userParmId: {
      type: String,
      required: "userParmId is required",
    },
    id: {
      type: String,
      required: "id is required",
    },
    text: {
      type: String,
      required: "text is required",
    },
    color: {
      type: String,
      default: "",
    },
    created: {
      type: Date,
      default: Date.now,
    },
  });

  // index with userParmId
  TagSchema.index({ userParmId: 1 });

  // define Tag model using TagSchema
  mongoose.model("Tag", TagSchema);
}
