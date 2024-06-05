import {
  CONS_ENDPOINT_DELETE_USER,
  CONS_ENDPOINT_FETCH_USER,
  CONS_ENDPOINT_LOGIN_WITH_EMAIL,
  CONS_ENDPOINT_LOGIN_WITH_GOOGLE,
  CONS_ENDPOINT_SIGNUP_WITH_EMAIL,
  CONS_ENDPOINT_VERIFY_EMAIL,
} from "../../../../common/constants";
import { serveDeleteUser } from "./serveDeleteUser";
import { serveFetchUser } from "./serveFetchUser";
import { serveLoginWithEmail } from "./serveLoginWithEmail";
import { serveLoginWithGoogle } from "./serveLoginWithGoogle";
import { serveSignUpWithEmail } from "./serveSignUpWithEmail";
import { serveVerifyEmail } from "./serveVerifyEmail";

export default function (app: any) {
  app.get(CONS_ENDPOINT_FETCH_USER, serveFetchUser);
  app.post(CONS_ENDPOINT_LOGIN_WITH_GOOGLE, serveLoginWithGoogle);
  app.post(CONS_ENDPOINT_SIGNUP_WITH_EMAIL, serveSignUpWithEmail);
  app.post(CONS_ENDPOINT_VERIFY_EMAIL, serveVerifyEmail);
  app.post(CONS_ENDPOINT_LOGIN_WITH_EMAIL, serveLoginWithEmail);
  app.post(CONS_ENDPOINT_DELETE_USER, serveDeleteUser);
}
