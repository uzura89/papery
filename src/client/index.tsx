import { createRoot } from "react-dom/client";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

import {
  CONS_PATH_REFLECT,
  CONS_PATH_REPORT,
  CONS_PATH_SETTINGS,
  CONS_PATH_TAGS,
  CONS_PATH_TEMPLATES,
  CONS_PATH_TEMPLATES_EDIT,
  CONS_PATH_TEMPLATES_NEW,
} from "../common/constants";
import { AppShell } from "./components/wrappers/AppShell";
import HomePage from "./components/pages/HomePage";
import ReportPage from "./components/pages/ReportPage";
import SettingsPage from "./components/pages/SettingsPage";
import TagsPage from "./components/pages/TagsPage";
import TemplatesPage from "./components/pages/TemplatesPage";
import NewTemplatePage from "./components/pages/NewTemplatePage";
import EditTemplatesPage from "./components/pages/EditTemplatePage";
import ReflectPage from "./components/pages/ReflectPage";

/**
 * Loadable Components
 */

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<AppShell />}>
        <Route path="/" element={<HomePage />} />
        <Route path={CONS_PATH_TEMPLATES} element={<TemplatesPage />} />
        <Route path={CONS_PATH_TEMPLATES_NEW} element={<NewTemplatePage />} />
        <Route
          path={CONS_PATH_TEMPLATES_EDIT + "/:id"}
          element={<EditTemplatesPage />}
        />
        <Route path={CONS_PATH_REPORT} element={<ReportPage />} />
        <Route path={CONS_PATH_TAGS} element={<TagsPage />} />
        <Route path={CONS_PATH_SETTINGS} element={<SettingsPage />} />
        <Route path={CONS_PATH_REFLECT} element={<ReflectPage />} />
        <Route path={CONS_PATH_REPORT} element={<ReportPage />} />
      </Route>
    </Route>
  )
);

/**
 * Render
 */

const root = createRoot(document.getElementById("root") as any);
root.render(<RouterProvider router={router} />);
