import { UserSchemaType } from "../../../common/types";

export async function dbCancelSubscription(mongoose: any, userParmId: string) {
  const User = mongoose.model("User");

  try {
    const user = await User.findOne({ userParmId });

    if (!user || !user.subscriptionId) {
      throw new Error("User not found");
    }

    user.cancelOnNextRenewal = true;
    await user.save();

    return user as UserSchemaType;
  } catch (err) {
    throw err;
  }
}
