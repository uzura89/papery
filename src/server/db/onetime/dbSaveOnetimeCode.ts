export async function dbSaveVerificationCode(
  mongoose: any,
  email: string,
  code: string
): Promise<void> {
  const OnetimeCode = mongoose.model("OnetimeCode");

  try {
    await OnetimeCode.findOneAndUpdate(
      {
        key: email,
      },
      {
        key: email,
        code,
        expireAt: new Date(Date.now() + 1000 * 60 * 10), // 10 minutes
      },
      {
        upsert: true,
      }
    );

    return;
  } catch (error) {
    throw error;
  }
}
