"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../../../common/constants");
const jwt_1 = require("../../modules/auth/jwt");
function default_1(app) {
    function renderApp(req, res) {
        // param of demo is true
        const isDemo = req.query.demo === "true";
        if (isDemo || checkIfAuthenticated(req, app)) {
            return res.render("pages/app");
        }
        return res.render("pages/landing");
    }
    function renderLogin(req, res) {
        return res.render("pages/login");
    }
    function renderSignup(req, res) {
        return res.render("pages/signup");
    }
    function renderPrivacy(req, res) {
        return res.render("pages/privacy");
    }
    function renderTerms(req, res) {
        return res.render("pages/terms");
    }
    function renderTokutei(req, res) {
        return res.render("pages/commerce");
    }
    // app routes
    app.get(constants_1.CONS_PATH_HOME, renderApp);
    app.get(constants_1.CONS_PATH_TEMPLATES, renderApp);
    app.get(constants_1.CONS_PATH_TEMPLATES_NEW, renderApp);
    app.get(constants_1.CONS_PATH_TEMPLATES_EDIT + "/*", renderApp);
    app.get(constants_1.CONS_PATH_REPORT, renderApp);
    app.get(constants_1.CONS_PATH_SETTINGS, renderApp);
    app.get(constants_1.CONS_PATH_TAGS, renderApp);
    app.get(constants_1.CONS_PATH_SETTINGS, renderApp);
    app.get(constants_1.CONS_PATH_REFLECT, renderApp);
    app.get(constants_1.CONS_PATH_REPORT, renderApp);
    app.get(constants_1.CONS_PATH_ENTRY + "/*", renderApp);
    // login routes
    app.get(constants_1.CONS_PATH_LOGIN, renderLogin);
    app.get(constants_1.CONS_PATH_SIGNUP, renderSignup);
    // privacy
    app.get(constants_1.CONS_PATH_PRIVACY, renderPrivacy);
    app.get(constants_1.CONS_PATH_TERMS, renderTerms);
    app.get(constants_1.CONS_PATH_COMMERCE, renderTokutei);
}
exports.default = default_1;
/**
 * checkIfAuthenticated
 */
function checkIfAuthenticated(req, app) {
    try {
        if (!req || !req.cookies || !req.cookies.access_token) {
            return false;
        }
        const token = req.cookies.access_token;
        const payload = (0, jwt_1.decodeAccessToken)(token);
        if (!payload.userParmId)
            throw new Error("Invalid token");
        return true;
    }
    catch (e) {
        return false;
    }
}
