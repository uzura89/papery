import { v4 } from "uuid";

import { dbCreateDefaultEntries } from "../entry/dbCreateDefaultEntries";
import { UserSchemaType } from "../../../common/types";

export async function dbCreateUser(
  mongoose: any,
  user: {
    email: string;
    googleId: string;
  }
) {
  const User = mongoose.model("User");

  const userParmId = v4();

  const newUser: UserSchemaType = {
    userParmId,
    email: user.email,
    googleId: user.googleId,
  };

  try {
    const user: UserSchemaType = await User.create(newUser);

    // create default entries
    await dbCreateDefaultEntries(mongoose, user.userParmId);

    return user;
  } catch (error) {
    throw error;
  }
}
