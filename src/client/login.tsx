import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

import {
  CONS_GOOGLE_CLIENT_ID,
  CONS_PATH_LOGIN,
  CONS_PATH_SIGNUP,
} from "../common/constants";
import LoginPage from "./components/pages/LoginPage";
import SignupPage from "./components/pages/SignupPage";

import { GoogleOAuthProvider } from "@react-oauth/google";
import { createRoot } from "react-dom/client";
import { LoginShell } from "./components/wrappers/LoginShell";

/**
 * Loadable Components
 */

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<LoginShell />}>
      <Route path={CONS_PATH_LOGIN} element={<LoginPage />} />
      <Route path={CONS_PATH_SIGNUP} element={<SignupPage />} />
    </Route>
  )
);

/**
 * Render
 */

const root = createRoot(document.getElementById("root") as any);
root.render(
  <GoogleOAuthProvider clientId={CONS_GOOGLE_CLIENT_ID}>
    <RouterProvider router={router} />
  </GoogleOAuthProvider>
);
