export default function (mongoose: any) {
  const { Schema } = mongoose;

  // define Entry Schema
  const EntrySchema = new Schema({
    userParmId: {
      type: String,
      required: "userParmId is required",
    },
    id: {
      type: String,
      required: "id is required",
    },
    body: {
      type: String,
      default: "",
    },
    date: {
      type: String,
      default: "",
    },
    tags: {
      type: [String],
      default: [],
    },
    primaryEmoji: {
      type: String,
      default: "",
    },
    draft: {
      type: Boolean,
      default: true,
    },
    pinned: {
      type: Boolean,
      default: false,
    },
    created: {
      type: Date,
      default: Date.now,
    },
  });

  // index with userParmId, date, created.
  EntrySchema.index({ userParmId: 1 });

  // userParmId, date, tags
  EntrySchema.index({ userParmId: 1, date: 1, tags: 1 });

  // define Entry model using EntrySchema
  mongoose.model("Entry", EntrySchema);
}
