import {
  CONS_PATH_HOME,
  CONS_PATH_LOGIN,
  CONS_PATH_PRIVACY,
  CONS_PATH_REFLECT,
  CONS_PATH_REPORT,
  CONS_PATH_SETTINGS,
  CONS_PATH_SIGNUP,
  CONS_PATH_TAGS,
  CONS_PATH_TEMPLATES,
  CONS_PATH_TEMPLATES_EDIT,
  CONS_PATH_TEMPLATES_NEW,
  CONS_PATH_TERMS,
} from "../../../common/constants";
import { decodeAccessToken } from "../../modules/auth/jwt";

module.exports = function (app: any) {
  function renderApp(req: any, res: any) {
    // param of demo is true
    const isDemo = req.query.demo === "true";
    if (isDemo || checkIfAuthenticated(req, app)) {
      return res.render("pages/app");
    }

    return res.render("pages/landing");
  }

  function renderLogin(req: any, res: any) {
    return res.render("pages/login");
  }

  function renderPrivacy(req: any, res: any) {
    return res.render("pages/privacy");
  }

  function renderTerms(req: any, res: any) {
    return res.render("pages/terms");
  }

  // app routes
  app.get(CONS_PATH_HOME, renderApp);
  app.get(CONS_PATH_TEMPLATES, renderApp);
  app.get(CONS_PATH_TEMPLATES_NEW, renderApp);
  app.get(CONS_PATH_TEMPLATES_EDIT + "/*", renderApp);
  app.get(CONS_PATH_REPORT, renderApp);
  app.get(CONS_PATH_SETTINGS, renderApp);
  app.get(CONS_PATH_TAGS, renderApp);
  app.get(CONS_PATH_SETTINGS, renderApp);
  app.get(CONS_PATH_REFLECT, renderApp);
  app.get(CONS_PATH_REPORT, renderApp);
  // login routes
  app.get(CONS_PATH_LOGIN, renderLogin);
  app.get(CONS_PATH_SIGNUP, renderLogin);
  // privacy
  app.get(CONS_PATH_PRIVACY, renderPrivacy);
  app.get(CONS_PATH_TERMS, renderTerms);
};

/**
 * checkIfAuthenticated
 */

function checkIfAuthenticated(req: any, app: any) {
  try {
    if (!req || !req.cookies || !req.cookies.access_token) {
      return false;
    }

    const token = req.cookies.access_token;

    const payload = decodeAccessToken(token);
    if (!payload.userParmId) throw new Error("Invalid token");

    return true;
  } catch (e) {
    return false;
  }
}
