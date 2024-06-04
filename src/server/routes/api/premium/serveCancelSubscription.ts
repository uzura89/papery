import { dbCancelSubscription } from "../../../db/user/dbCancelSubscription";
import StripeHandler from "../../../modules/stripe/StripeHandler";

export async function serveCancelSubscription(req: any, res: any) {
  const { userParmId } = req;

  try {
    const user = await dbCancelSubscription(req.mongoose, userParmId);
    if (!user.subscriptionId) {
      return res.status(400).json({
        message: "User has no subscription",
      });
    }

    await StripeHandler.cancelOnPeriodEnd(user.subscriptionId);

    return res.status(200).json({
      cancelOnPeriodEnd: user.cancelOnPeriodEnd,
      subscriptionRenewalDate: user.subscriptionRenewalDate,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
}
