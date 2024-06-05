"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../../../../common/constants");
const serveFetchUser_1 = require("./serveFetchUser");
const serveLoginWithEmail_1 = require("./serveLoginWithEmail");
const serveLoginWithGoogle_1 = require("./serveLoginWithGoogle");
const serveSignUpWithEmail_1 = require("./serveSignUpWithEmail");
const serveVerifyEmail_1 = require("./serveVerifyEmail");
function default_1(app) {
    app.get(constants_1.CONS_ENDPOINT_FETCH_USER, serveFetchUser_1.serveFetchUser);
    app.post(constants_1.CONS_ENDPOINT_LOGIN_WITH_GOOGLE, serveLoginWithGoogle_1.serveLoginWithGoogle);
    app.post(constants_1.CONS_ENDPOINT_SIGNUP_WITH_EMAIL, serveSignUpWithEmail_1.serveSignUpWithEmail);
    app.post(constants_1.CONS_ENDPOINT_VERIFY_EMAIL, serveVerifyEmail_1.serveVerifyEmail);
    app.post(constants_1.CONS_ENDPOINT_LOGIN_WITH_EMAIL, serveLoginWithEmail_1.serveLoginWithEmail);
}
exports.default = default_1;
