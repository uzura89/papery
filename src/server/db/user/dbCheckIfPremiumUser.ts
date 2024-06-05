export async function dbCheckIfPremiumUser(
  mongoose: any,
  userParmId: string
): Promise<boolean> {
  const User = mongoose.model("User");

  try {
    // fetch user
    const user = await User.findOne({ userParmId }).lean();

    if (user && user.purchasePlan) {
      return true;
    }

    return false;
  } catch (error) {
    throw error;
  }
}
