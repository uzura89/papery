"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const compression_1 = __importDefault(require("compression"));
const mongoose_1 = __importDefault(require("mongoose"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const dotenv_1 = __importDefault(require("dotenv"));
const jwt_1 = require("../modules/auth/jwt");
const constants_1 = require("../../common/constants");
const api_cons_1 = require("../../common/constants/api.cons");
const index_1 = __importDefault(require("../models/index"));
const index_2 = __importDefault(require("../routes/index"));
// load from .local.env
dotenv_1.default.config({ path: ".local.env" });
mongoose_1.default.connect(process.env.DB_URI);
const app = (0, express_1.default)();
function default_1() {
    // models
    (0, index_1.default)(mongoose_1.default);
    // configureExpress
    configureExpress(app);
    // redirectWWW
    redirectWWW(app);
    // add mongoose and userId to req
    app.use((req, res, next) => {
        // if query has demo=true, set userParmId to demo user
        if (req.headers[constants_1.CONS_HEADER_ITEM_DEMO_USER] === "true") {
            const urlPath = req.originalUrl.split("?")[0];
            if (constants_1.DEMO_ALLOWED_URLS.includes(urlPath) === false) {
                return res.status(api_cons_1.CONS_ERROR_CODE_FORBIDDEN).json({
                    message: "Demo user cannot access this API",
                });
            }
            req.userParmId = constants_1.CONS_DEMO_USER_ID;
        }
        // if token exists, decode and set userParmId
        const token = req.body.token || req.query.token || req.headers.authorization;
        if (token && token !== "null") {
            const payload = (0, jwt_1.decodeAccessToken)(token);
            req.userParmId = payload.userParmId;
        }
        // auth check: if it's an API call and userParmId is not set, throw error
        if (req.originalUrl.startsWith("/api") && !req.userParmId) {
            return res.status(401).json({
                message: "Unauthorized",
            });
        }
        req.mongoose = mongoose_1.default;
        next();
    });
    // routes
    (0, index_2.default)(app);
    // error handler
    errorHandlers(app);
    return { app };
}
exports.default = default_1;
/**
 * configureExpress
 */
function configureExpress(app) {
    // set view directory
    app.set("views", "./src/server/views");
    app.set("view engine", "ejs");
    // compress
    app.use((0, compression_1.default)());
    // cookie parser
    app.use((0, cookie_parser_1.default)());
    app.set("jwtSecret", process.env.JWT_SECRET);
    app.use(express_1.default.static("./public"));
    // use bodyParser to parse post request
    app.use(body_parser_1.default.urlencoded({ limit: "10mb", extended: true }));
    // this has the same function but for JSON form
    app.use(body_parser_1.default.json({
        // Because Stripe needs the raw body
        verify: (req, res, buf) => {
            const url = req.originalUrl;
            if (url.startsWith("/stripe-webhook")) {
                req.rawBody = buf.toString();
            }
        },
    }));
}
/**
 * redirectWWW
 */
function redirectWWW(app) {
    app.get("/*", (req, res, next) => {
        if (req.headers.host.match(/^www/) !== null) {
            res.redirect(`https://${req.headers.host.replace(/^www\./, "")}${req.url}`);
        }
        else {
            next();
        }
    });
}
/**
 * errorHandlers
 */
function errorHandlers(app) {
    // render 404 error page
    if (process.env.NODE_ENV === "production") {
        app.use((req, res) => {
            res.status(404);
            // respond with html page
            if (req.accepts("html")) {
                res.render("pages/404.ejs");
                return;
            }
            // respond with json
            if (req.accepts("json")) {
                res.send({ error: "Not found" });
                return;
            }
            // default to plain-text. send()
            res.type("txt").send("Not found");
        });
    }
}
