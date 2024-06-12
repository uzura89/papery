import {
  CONS_ENDPOINT_FETCH_SETTING,
  CONS_ENDPOINT_RESET_EMOJI_PALETTE,
  CONS_ENDPOINT_UPDATE_EMOJI_PALETTE,
  CONS_ENDPOINT_UPDATE_THEME,
} from "../../../../common/constants";
import { serveFetchSetting } from "./serveFetchSetting";
import { serveResetEmojiPalette } from "./serveResetEmojiPalette";
import { serveUpdateEmojiPalette } from "./serveUpdateEmojiPalette";
import { serveUpdateTheme } from "./serveUpdateTheme";

export default function (app: any) {
  app.get(CONS_ENDPOINT_FETCH_SETTING, serveFetchSetting);
  app.post(CONS_ENDPOINT_UPDATE_THEME, serveUpdateTheme);
  app.post(CONS_ENDPOINT_UPDATE_EMOJI_PALETTE, serveUpdateEmojiPalette);
  app.post(CONS_ENDPOINT_RESET_EMOJI_PALETTE, serveResetEmojiPalette);
}
