"use strict";
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.serveStripeWebhook = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const dbPurchaseSubscription_1 = require("../../../db/user/dbPurchaseSubscription");
const StripeHandler_1 = __importDefault(
  require("../../../modules/stripe/StripeHandler")
);
const dbPurchaseOnetime_1 = require("../../../db/user/dbPurchaseOnetime");
const dbUpdateSubscription_1 = require("../../../db/user/dbUpdateSubscription");
const dbRemovePremiumFromUser_1 = require("../../../db/user/dbRemovePremiumFromUser");
function serveStripeWebhook(req, res) {
  return __awaiter(this, void 0, void 0, function* () {
    try {
      const stripeEvent = yield StripeHandler_1.default.retrieveStripeEvent(
        req
      );
      switch (stripeEvent.type) {
        case "checkout.session.completed":
          yield onCheckoutSessionCompleted(stripeEvent);
          break;
        case "customer.subscription.updated":
          yield onCustomerSubscriptionUpdated(stripeEvent);
          break;
        case "customer.subscription.deleted":
          yield onCustomerSubscriptionDeleted(stripeEvent);
          break;
        case "customer.deleted":
          yield onCustomerDeleted(stripeEvent);
          break;
        default:
          return res.status(200).end();
      }
    } catch (err) {
      return res.status(500).send(err);
    }
  });
}
exports.serveStripeWebhook = serveStripeWebhook;
/**
 * Sub functions
 */
function onCheckoutSessionCompleted(stripeEvent) {
  return __awaiter(this, void 0, void 0, function* () {
    const stripeSession = yield StripeHandler_1.default.retrieveCheckoutSession(
      stripeEvent
    );
    const priceItem = StripeHandler_1.default.getPriceItem(stripeSession);
    // error handling
    if (!priceItem) {
      throw new Error("Price not found");
    }
    if (!stripeSession.customer_email) {
      throw new Error("Customer email not found");
    }
    if (typeof stripeSession.customer !== "string") {
      throw new Error("Customer not found");
    }
    // process checkout.session.completed event
    if (!priceItem.isRecurring) {
      yield (0, dbPurchaseOnetime_1.dbPurchaseOnetime)(
        mongoose_1.default,
        stripeSession.customer_email,
        {
          customerId: stripeSession.customer,
          purchaseId: stripeSession.id,
          purchasePlan: priceItem.title,
        }
      );
    } else {
      if (typeof stripeSession.subscription !== "string") {
        throw new Error("Subscription not found");
      }
      const subscription = yield StripeHandler_1.default.retrieveSubscription(
        stripeSession.subscription
      );
      if (
        !subscription ||
        typeof subscription.current_period_end !== "number"
      ) {
        throw new Error("Subscription not found");
      }
      yield (0, dbPurchaseSubscription_1.dbPurchaseSubscription)(
        mongoose_1.default,
        stripeSession.customer_email,
        {
          customerId: stripeSession.customer,
          purchaseId: stripeSession.id,
          purchasePlan: priceItem.title,
          subscriptionId: subscription.id,
          subscriptionCurrentPeriodEnd: subscription.current_period_end * 1000,
          subscriptionCancelAtPeriodEnd: subscription.cancel_at_period_end,
        }
      );
    }
  });
}
function onCustomerSubscriptionUpdated(stripeEvent) {
  return __awaiter(this, void 0, void 0, function* () {
    const subscription = stripeEvent.data.object;
    const customer =
      yield StripeHandler_1.default.retrieveCustomerFromSubscription(
        subscription
      );
    // handle customer.subscription.updated event
    yield (0,
    dbUpdateSubscription_1.dbUpdateSubscription)(mongoose_1.default, customer.id, {
      subscriptionCurrentPeriodEnd: subscription.current_period_end * 1000,
      subscriptionCancelAtPeriodEnd: subscription.cancel_at_period_end,
    });
  });
}
function onCustomerSubscriptionDeleted(stripeEvent) {
  return __awaiter(this, void 0, void 0, function* () {
    const subscription = stripeEvent.data.object;
    const customer =
      yield StripeHandler_1.default.retrieveCustomerFromSubscription(
        subscription
      );
    yield (0,
    dbRemovePremiumFromUser_1.dbRemovePremiumFromUser)(mongoose_1.default, customer.id);
  });
}
function onCustomerDeleted(stripeEvent) {
  return __awaiter(this, void 0, void 0, function* () {
    const customer = stripeEvent.data.object;
    yield (0,
    dbRemovePremiumFromUser_1.dbRemovePremiumFromUser)(mongoose_1.default, customer.id);
  });
}
