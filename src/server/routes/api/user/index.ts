import {
  CONS_ENDPOINT_FETCH_USER,
  CONS_ENDPOINT_LOGIN_WITH_GOOGLE,
} from "../../../../common/constants";
import { serveFetchUser } from "./serveFetchUser";
import { serveLoginWithGoogle } from "./serveLoginWithGoogle";

module.exports = function (app: any) {
  app.get(CONS_ENDPOINT_FETCH_USER, serveFetchUser);
  app.post(CONS_ENDPOINT_LOGIN_WITH_GOOGLE, serveLoginWithGoogle);
};
