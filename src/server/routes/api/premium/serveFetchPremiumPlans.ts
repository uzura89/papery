import { getLocalEnv } from "../../../modules/env/getLocalEnv";
import { getPremiumPlans } from "../../../modules/premium/getPremiumPlans";

const env = getLocalEnv();

export async function serveFetchPremiumPlans(req: any, res: any) {
  try {
    const premiumPlans = getPremiumPlans(env.APP_ENV);

    return res.status(200).send({ premiumPlans });
  } catch (err) {
    res.status(500).send("Something went wrong");
  }
}
