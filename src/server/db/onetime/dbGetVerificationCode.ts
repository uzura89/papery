export async function dbGetVerificationCode(
  mongoose: any,
  email: string
): Promise<string> {
  const OnetimeCode = mongoose.model("OnetimeCode");

  try {
    const onetimeCode = await OnetimeCode.findOne({ key: email });
    if (!onetimeCode) {
      throw new Error("Code not found");
    }

    if (onetimeCode.expireAt < new Date()) {
      throw new Error("Code expired");
    }

    return onetimeCode.code;
  } catch (error) {
    throw error;
  }
}
