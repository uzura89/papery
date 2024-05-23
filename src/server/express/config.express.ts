import express from "express";
import bodyParser from "body-parser";
import compression from "compression";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

import { decodeAccessToken } from "../modules/auth/jwt";
import {
  CONS_DEMO_USER_ID,
  CONS_HEADER_ITEM_DEMO_USER,
  DEMO_ALLOWED_URLS,
} from "../../common/constants";
import { CONS_ERROR_CODE_FORBIDDEN } from "../../common/constants/api.cons";

// load from .local.env
dotenv.config({ path: ".local.env" });

mongoose.connect(process.env.DB_URI as string);

const app = express();

export default function () {
  // models
  require("../models/index")(mongoose);

  // configureExpress
  configureExpress(app);

  // redirectWWW
  redirectWWW(app);

  // add mongoose and userId to req
  app.use((req: any, res: any, next: any) => {
    // if query has demo=true, set userParmId to demo user
    if (req.headers[CONS_HEADER_ITEM_DEMO_USER] === "true") {
      const urlPath = req.originalUrl.split("?")[0];
      if (DEMO_ALLOWED_URLS.includes(urlPath) === false) {
        return res.status(CONS_ERROR_CODE_FORBIDDEN).json({
          message: "Demo user cannot access this API",
        });
      }

      req.userParmId = CONS_DEMO_USER_ID;
    }

    // if token exists, decode and set userParmId
    const token =
      req.body.token || req.query.token || req.headers.authorization;
    if (token && token !== "null") {
      const payload = decodeAccessToken(token);
      req.userParmId = payload.userParmId;
    }

    // auth check: if it's an API call and userParmId is not set, throw error
    if (req.originalUrl.startsWith("/api") && !req.userParmId) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    req.mongoose = mongoose;
    next();
  });

  // routes
  require("../routes/index")(app);

  // error handler
  errorHandlers(app);

  return { app };
}

/**
 * configureExpress
 */

function configureExpress(app: any) {
  // set view directory
  app.set("views", "./src/server/views");
  app.set("view engine", "ejs");

  // compress
  app.use(compression());

  // cookie parser
  app.use(cookieParser());

  app.set("jwtSecret", process.env.JWT_SECRET);

  app.use(express.static("./public"));

  // use bodyParser to parse post request
  app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));

  // this has the same function but for JSON form
  app.use(
    bodyParser.json({
      // Because Stripe needs the raw body
      verify: (req: any, res: any, buf: any) => {
        const url = req.originalUrl;

        if (url.startsWith("/stripe-webhook")) {
          req.rawBody = buf.toString();
        }
      },
    })
  );
}

/**
 * redirectWWW
 */

function redirectWWW(app: any) {
  app.get("/*", (req: any, res: any, next: any) => {
    if (req.headers.host.match(/^www/) !== null) {
      res.redirect(
        `https://${req.headers.host.replace(/^www\./, "")}${req.url}`
      );
    } else {
      next();
    }
  });
}

/**
 * errorHandlers
 */

function errorHandlers(app: any) {
  // render 404 error page
  if (process.env.NODE_ENV === "production") {
    app.use((req: any, res: any) => {
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
