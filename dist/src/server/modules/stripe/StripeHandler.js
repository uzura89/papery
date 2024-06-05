"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const stripe_1 = __importDefault(require("stripe"));
const getLocalEnv_1 = require("../env/getLocalEnv");
const getPremiumPlans_1 = require("../premium/getPremiumPlans");
const constants_1 = require("../../../common/constants");
const env = (0, getLocalEnv_1.getLocalEnv)();
const stripe = new stripe_1.default(env.STRIPE_KEY_SEC);
/**
 * Functions
 */
function generateCheckoutUrl(params) {
    return __awaiter(this, void 0, void 0, function* () {
        const sessionObject = {
            customer_email: params.customerEmail,
            line_items: [
                {
                    price: params.priceId,
                    quantity: 1,
                },
            ],
            mode: params.isRecurring ? "subscription" : "payment",
            success_url: `${env.APP_URL}${constants_1.CONS_PATH_SETTINGS}`,
            cancel_url: `${env.APP_URL}${constants_1.CONS_PATH_SETTINGS}`,
        };
        // this is needed to create an invoice for one-time payments
        if (!params.isRecurring) {
            sessionObject.invoice_creation = {
                enabled: true,
            };
        }
        const session = yield stripe.checkout.sessions.create(sessionObject);
        return session.url;
    });
}
const retrieveStripeEvent = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const sig = req.headers["stripe-signature"];
    const payload = req.rawBody;
    const endpointSecret = env.STRIPE_ENDPOINT_SECRET;
    return stripe.webhooks.constructEvent(payload, sig, endpointSecret);
});
const retrieveCheckoutSession = (event) => __awaiter(void 0, void 0, void 0, function* () {
    return stripe.checkout.sessions.retrieve(event.data.object.id, {
        expand: ["line_items"],
    });
});
const retrieveSubscription = (subscriptionId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const subscription = yield stripe.subscriptions.retrieve(subscriptionId);
        if (!subscription)
            throw new Error("Subscription not found");
        return subscription;
    }
    catch (err) {
        return null;
    }
});
const retrieveCustomerFromSubscription = (subscription) => __awaiter(void 0, void 0, void 0, function* () {
    const customer = yield stripe.customers.retrieve(subscription.customer);
    return customer;
});
const getPriceItem = (stripeSession) => {
    const lineItem = stripeSession.line_items.data[0];
    const priceId = lineItem.price.id;
    const priceItem = (0, getPremiumPlans_1.getPremiumPlans)(env.APP_ENV).find((item) => item.id === priceId);
    return priceItem;
};
const cancelSubscription = (subscriptionId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield stripe.subscriptions.cancel(subscriptionId);
    }
    catch (err) {
        throw err;
    }
});
const cancelAtPeriodEnd = (subscriptionId) => __awaiter(void 0, void 0, void 0, function* () {
    yield stripe.subscriptions.update(subscriptionId, {
        cancel_at_period_end: true,
    });
});
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
exports.default = StripeHandler;
