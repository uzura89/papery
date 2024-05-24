module.exports = function (mongoose: any) {
  const { Schema } = mongoose;

  // define Entry Schema
  const OnetimeCode = new Schema({
    key: {
      type: String,
      required: "key is required",
    },
    code: {
      type: String,
      required: "code is required",
    },
    expireAt: {
      type: Date,
      required: "expires is required",
    },
    created: {
      type: Date,
      default: Date.now,
    },
  });

  // index with userParmId
  OnetimeCode.index({ key: 1 });

  // define Setting model using OnetimeCode
  mongoose.model("OnetimeCode", OnetimeCode);
};
