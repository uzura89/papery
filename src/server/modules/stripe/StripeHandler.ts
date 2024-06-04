import Stripe from "stripe";

import { getLocalEnv } from "../env/getLocalEnv";
import { getPremiumPlans } from "../premium/getPremiumPlans";
import { CONS_PATH_SETTINGS } from "../../../common/constants";

const env = getLocalEnv();
const stripe = new Stripe(env.STRIPE_KEY_SEC);

/**
 * Functions
 */

async function generateCheckoutUrl(params: {
  priceId: string;
  customerEmail: string;
  isRecurring: boolean;
}) {
  const sessionObject: any = {
    customer_email: params.customerEmail,
    line_items: [
      {
        price: params.priceId,
        quantity: 1,
      },
    ],
    mode: params.isRecurring ? "subscription" : "payment",
    success_url: `${env.APP_URL}${CONS_PATH_SETTINGS}`,
    cancel_url: `${env.APP_URL}${CONS_PATH_SETTINGS}`,
  };

  // this is needed to create an invoice for one-time payments
  if (!params.isRecurring) {
    sessionObject.invoice_creation = {
      enabled: true,
    };
  }

  const session = await stripe.checkout.sessions.create(sessionObject);

  return session.url;
}

const retrieveStripeEvent = async (req: any) => {
  const sig = req.headers["stripe-signature"];
  const payload = req.rawBody;
  const endpointSecret = env.STRIPE_ENDPOINT_SECRET;

  return stripe.webhooks.constructEvent(payload, sig, endpointSecret);
};

const retrieveCheckoutSession = async (event: any) => {
  return stripe.checkout.sessions.retrieve(event.data.object.id, {
    expand: ["line_items"],
  });
};

const retrieveSubscription = async (subscriptionId: string) => {
  try {
    const subscription = await stripe.subscriptions.retrieve(subscriptionId);

    if (!subscription) throw new Error("Subscription not found");

    return subscription;
  } catch (err) {
    return null;
  }
};

const retrieveCustomerFromSubscription = async (subscription: any) => {
  const customer = await stripe.customers.retrieve(subscription.customer);

  return customer;
};

const getPriceItem = (stripeSession: any) => {
  const lineItem = stripeSession.line_items.data[0];
  const priceId = lineItem.price.id;

  const priceItem = getPremiumPlans(env.APP_ENV).find(
    (item: any) => item.id === priceId
  );

  return priceItem;
};

const cancelSubscription = async (subscriptionId: string) => {
  try {
    await stripe.subscriptions.cancel(subscriptionId);
  } catch (err) {
    throw err;
  }
};

const cancelAtPeriodEnd = async (subscriptionId: string) => {
  await stripe.subscriptions.update(subscriptionId, {
    cancel_at_period_end: true,
  });
};

/**
 * Exports
 */

const StripeHandler = {
  generateCheckoutUrl,
  retrieveStripeEvent,
  retrieveCheckoutSession,
  getPriceItem,
  cancelSubscription,
  retrieveSubscription,
  retrieveCustomerFromSubscription,
  cancelAtPeriodEnd,
};

export default StripeHandler;
