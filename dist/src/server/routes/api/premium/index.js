"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../../../../common/constants");
const serveCreateCheckoutSession_1 = require("./serveCreateCheckoutSession");
const serveFetchPremiumPlans_1 = require("./serveFetchPremiumPlans");
const serveStripeWebhook_1 = require("./serveStripeWebhook");
function default_1(app) {
    app.get(constants_1.CONS_ENDPOINT_FETCH_PREMIUM_PLANS, serveFetchPremiumPlans_1.serveFetchPremiumPlans);
    app.post(constants_1.CONS_ENDPOINT_STRIPE_WEBHOOK, serveStripeWebhook_1.serveStripeWebhook);
    app.post(constants_1.CONS_ENDPOINT_CREATE_CHECKOUT_SESSION, serveCreateCheckoutSession_1.serveCreateCheckoutSession);
}
exports.default = default_1;
