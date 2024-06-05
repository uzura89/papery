export default function (mongoose: any) {
  const { Schema } = mongoose;

  // define Entry Schema
  const ReportSchema = new Schema({
    userParmId: {
      type: String,
      required: "userParmId is required",
    },
    id: {
      type: String,
      required: "id is required",
    },
    reportName: {
      type: String,
      default: "",
    },
    filterByTagIds: {
      type: [String],
      required: "filterByTags is required",
    },
    divideBy: {
      type: String,
      required: "divideBy is required",
    },
    reportType: {
      type: String,
      required: "reportType is required",
    },
    duration: {
      type: String,
      required: "duration is required",
    },
    order: {
      type: Number,
      required: "order is required",
    },
    created: {
      type: Date,
      default: Date.now,
    },
  });

  // index with userParmId
  ReportSchema.index({ userParmId: 1 });

  // define Report model using ReportSchema
  mongoose.model("Report", ReportSchema);
}
