"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CONS_URL_CUSTOMER_PORTAL = exports.DEMO_ALLOWED_URLS = exports.CONS_DEMO_USER_ID = exports.CONS_HEADER_ITEM_DEMO_USER = exports.CONS_QUERY_PARAM_DEMO = exports.CONS_COMPANY_EMAIL_NOREPLY = exports.CONS_COMPANY_EMAIL = exports.CONS_COMPANY_NAME = exports.CONS_GOOGLE_TAG_MANAGER_ID = exports.CONS_GOOGLE_CLIENT_ID = void 0;
const endpoint_cons_1 = require("./endpoint.cons");
exports.CONS_GOOGLE_CLIENT_ID = "284988480923-789v0mrgtqveuhgcp1t2s4er2a79nq8u.apps.googleusercontent.com";
exports.CONS_GOOGLE_TAG_MANAGER_ID = "G-L7CXXJRV7M";
/**
 * Company Info
 */
exports.CONS_COMPANY_NAME = "Papery";
exports.CONS_COMPANY_EMAIL = "papery.contact@gmail.com";
exports.CONS_COMPANY_EMAIL_NOREPLY = "noreply@papery.me";
/**
 * For Demo
 */
exports.CONS_QUERY_PARAM_DEMO = "demo";
exports.CONS_HEADER_ITEM_DEMO_USER = "x-demo-user";
exports.CONS_DEMO_USER_ID = "demo-user-id";
exports.DEMO_ALLOWED_URLS = [
    endpoint_cons_1.CONS_ENDPOINT_FETCH_USER,
    endpoint_cons_1.CONS_ENDPOINT_FETCH_RECENT_ENTRIES,
    endpoint_cons_1.CONS_ENDPOINT_FETCH_ENTRY_HISTORIES,
    endpoint_cons_1.CONS_ENDPOINT_FETCH_ENTRIES_BY_TEXT,
    endpoint_cons_1.CONS_ENDPOINT_FETCH_ALL_TAGS,
    endpoint_cons_1.CONS_ENDPOINT_FETCH_REFLECTIONS,
    endpoint_cons_1.CONS_ENDPOINT_FETCH_ENTRIES_CSV,
    endpoint_cons_1.CONS_ENDPOINT_FETCH_ALL_REPORTS,
    endpoint_cons_1.CONS_ENDPOINT_FETCH_REPORT_DATA,
    endpoint_cons_1.CONS_ENDPOINT_FETCH_PREMIUM_PLANS,
];
/**
 * Payment
 */
exports.CONS_URL_CUSTOMER_PORTAL = "https://billing.stripe.com/p/login/fZebLib7sf0H4py3cc";
