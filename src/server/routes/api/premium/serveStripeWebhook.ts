import mongoose from "mongoose";

import { dbPurchaseSubscription } from "../../../db/user/dbPurchaseSubscription";
import StripeHandler from "../../../modules/stripe/StripeHandler";
import { dbPurchaseOnetime } from "../../../db/user/dbPurchaseOnetime";
import { dbUpdateSubscription } from "../../../db/user/dbUpdateSubscription";
import { dbRemovePremiumFromUser } from "../../../db/user/dbRemovePremiumFromUser";

export async function serveStripeWebhook(req: any, res: any) {
  try {
    const stripeEvent = await StripeHandler.retrieveStripeEvent(req);

    switch (stripeEvent.type) {
      case "checkout.session.completed":
        await onCheckoutSessionCompleted(stripeEvent);
      case "customer.subscription.updated":
        await onCustomerSubscriptionUpdated(stripeEvent);
      case "customer.subscription.deleted":
        await onCustomerSubscriptionDeleted(stripeEvent);
      case "customer.deleted":
        await onCustomerDeleted(stripeEvent);
      default:
        return res.status(200).end();
    }
  } catch (err) {
    return res.status(500).send(err);
  }
}

/**
 * Sub functions
 */

async function onCheckoutSessionCompleted(stripeEvent: any) {
  const stripeSession = await StripeHandler.retrieveCheckoutSession(
    stripeEvent
  );
  const priceItem = StripeHandler.getPriceItem(stripeSession);

  // error handling
  if (!priceItem) {
    throw new Error("Price not found");
  }
  if (
    !stripeSession.customer_email ||
    typeof stripeSession.customer !== "string"
  ) {
    throw new Error("Customer email not found");
  }
  if (typeof stripeSession.subscription !== "string") {
    throw new Error("Subscription not found");
  }

  // process checkout.session.completed event
  if (!priceItem.isRecurring) {
    await dbPurchaseOnetime(mongoose, stripeSession.customer_email, {
      customerId: stripeSession.customer,
      purchaseId: stripeSession.id,
      purchasePlan: priceItem.title,
    });
  } else {
    const subscription = await StripeHandler.retrieveSubscription(
      stripeSession.subscription
    );

    if (!subscription || typeof subscription.current_period_end !== "number") {
      throw new Error("Subscription not found");
    }

    await dbPurchaseSubscription(mongoose, stripeSession.customer_email, {
      customerId: stripeSession.customer,
      purchaseId: stripeSession.id,
      purchasePlan: priceItem.title,
      subscriptionId: subscription.id,
      subscriptionRenewalDate: subscription.current_period_end * 1000,
      cancelOnPeriodEnd: subscription.cancel_at_period_end,
    });
  }
}

async function onCustomerSubscriptionUpdated(stripeEvent: any) {
  const subscription = stripeEvent.data.object;
  const customer = await StripeHandler.retrieveCustomerFromSubscription(
    subscription
  );

  // handle customer.subscription.updated event
  await dbUpdateSubscription(mongoose, customer.id, {
    subscriptionRenewalDate: subscription.current_period_end * 1000,
    cancelOnNextRenewal: subscription.cancel_at_period_end,
  });
}

async function onCustomerSubscriptionDeleted(stripeEvent: any) {
  const subscription = stripeEvent.data.object;
  const customer = await StripeHandler.retrieveCustomerFromSubscription(
    subscription
  );

  await dbRemovePremiumFromUser(mongoose, customer.id);
}

async function onCustomerDeleted(stripeEvent: any) {
  const customer = stripeEvent.data.object;
  await dbRemovePremiumFromUser(mongoose, customer.id);
}
