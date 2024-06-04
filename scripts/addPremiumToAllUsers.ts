import { CONS_PREMIUM_TYPE_LIFETIME } from "../src/common/constants/setting.cons";
import { getMongoose } from "./modules/getMongoose";

async function addPremiumToUsers(mongoose: any) {
  try {
    const User = mongoose.model("User");

    const users = await User.find({ email: { $ne: "ys0520" } });

    for (const user of users) {
      user.customerId = null;
      user.purchaseId = "granted";
      user.purchasePlan = CONS_PREMIUM_TYPE_LIFETIME;
      user.subscriptionId = null;
      user.subscriptionCurrentPeriodEnd = null;
      user.subscriptionCancelAtPeriodEnd = null;
      await user.save();
    }
  } catch (err) {
    console.error(err);
  }
}

async function main() {
  try {
    const mongoose = getMongoose();
    if (!mongoose) {
      return;
    }

    await addPremiumToUsers(mongoose);

    if (mongoose) {
      mongoose.connection.close();
    }
    return;
  } catch (err) {
    console.error(err);
  }
}

main();
