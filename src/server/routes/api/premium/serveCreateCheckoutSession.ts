import { getLocalEnv } from "../../../modules/env/getLocalEnv";
import { getPremiumPlans } from "../../../modules/premium/getPremiumPlans";
import StripeHandler from "../../../modules/stripe/StripeHandler";

const env = getLocalEnv();

export async function serveCreateCheckoutSession(req: any, res: any) {
  const User = req.mongoose.model("User");

  const { userParmId } = req;
  const { priceId } = req.body;

  try {
    const priceItem = getPremiumPlans(env.APP_ENV).find(
      (item) => item.id === priceId
    );

    if (!priceItem) {
      throw new Error("Price not found");
    }

    const user = await User.findOne({ userParmId });

    const checkoutUrl = await StripeHandler.generateCheckoutUrl({
      priceId,
      customerEmail: user.email,
    });

    return res.status(200).send({ checkoutUrl });
  } catch (err) {
    res.status(500).send("Something went wrong");
  }
}
