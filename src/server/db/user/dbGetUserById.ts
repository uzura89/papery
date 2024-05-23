import { UserSchemaType } from "../../../common/types";

export async function dbGetUserById(
  mongoose: any,
  options: { userParmId: string }
) {
  const User = mongoose.model("User");

  try {
    const user: UserSchemaType = await User.findOne({
      userParmId: options.userParmId,
    });

    return user;
  } catch (error) {
    throw error;
  }
}
