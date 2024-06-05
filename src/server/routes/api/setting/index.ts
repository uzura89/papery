import {
  CONS_ENDPOINT_FETCH_SETTING,
  CONS_ENDPOINT_UPDATE_THEME,
} from "../../../../common/constants";
import { serveFetchSetting } from "./serveFetchSetting";
import { serveUpdateTheme } from "./serveUpdateTheme";

export default function (app: any) {
  app.get(CONS_ENDPOINT_FETCH_SETTING, serveFetchSetting);
  app.post(CONS_ENDPOINT_UPDATE_THEME, serveUpdateTheme);
}
