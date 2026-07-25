"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../../../../common/constants");
const serveFetchSetting_1 = require("./serveFetchSetting");
const serveResetEmojiPalette_1 = require("./serveResetEmojiPalette");
const serveUpdateEmojiPalette_1 = require("./serveUpdateEmojiPalette");
const serveUpdateTheme_1 = require("./serveUpdateTheme");
function default_1(app) {
    app.get(constants_1.CONS_ENDPOINT_FETCH_SETTING, serveFetchSetting_1.serveFetchSetting);
    app.post(constants_1.CONS_ENDPOINT_UPDATE_THEME, serveUpdateTheme_1.serveUpdateTheme);
    app.post(constants_1.CONS_ENDPOINT_UPDATE_EMOJI_PALETTE, serveUpdateEmojiPalette_1.serveUpdateEmojiPalette);
    app.post(constants_1.CONS_ENDPOINT_RESET_EMOJI_PALETTE, serveResetEmojiPalette_1.serveResetEmojiPalette);
}
exports.default = default_1;
