import {
  CONS_ENDPOINT_FETCH_PREMIUM_PLANS,
  CONS_ENDPOINT_STRIPE_WEBHOOK,
  CONS_ENDPOINT_CREATE_CHECKOUT_SESSION,
} from "../../../../common/constants";
import { serveCreateCheckoutSession } from "./serveCreateCheckoutSession";
import { serveFetchPremiumPlans } from "./serveFetchPremiumPlans";
import { serveStripeWebhook } from "./serveStripeWebhook";

module.exports = function (app: any) {
  app.get(CONS_ENDPOINT_FETCH_PREMIUM_PLANS, serveFetchPremiumPlans);
  app.post(CONS_ENDPOINT_STRIPE_WEBHOOK, serveStripeWebhook);
  app.post(CONS_ENDPOINT_CREATE_CHECKOUT_SESSION, serveCreateCheckoutSession);
};
