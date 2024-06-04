import { v4 } from "uuid";

import { UserSchemaType } from "../../../common/types";
import { hashString, makeSalt } from "../../modules/auth/crypto";
import { dbCreateDefaultEntries } from "../entry/dbCreateDefaultEntries";

export async function dbCreateUserEmail(
  mongoose: any,
  user: {
    email: string;
    password: string;
  }
) {
  const User = mongoose.model("User");

  const userParmId = v4();

  const salt = makeSalt();

  const newUser: UserSchemaType = {
    userParmId,
    email: user.email,
    googleId: "",
    password: hashString(user.password, salt),
    salt,
    activated: false,
    customerId: null,
    purchaseId: null,
    purchasePlan: null,
    subscriptionId: null,
    subscriptionRenewalDate: null,
    cancelAtPeriodEnd: null,
  };

  try {
    const user: UserSchemaType = await User.create(newUser);

    // add default entries
    await dbCreateDefaultEntries(mongoose, user.userParmId);

    return user;
  } catch (error) {
    throw error;
  }
}
