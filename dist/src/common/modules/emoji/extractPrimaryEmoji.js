"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractPrimaryEmoji = void 0;
function extractPrimaryEmoji(body) {
    const emojis = body.match(/\p{Emoji_Presentation}/u);
    const emojisNoSharp = emojis === null || emojis === void 0 ? void 0 : emojis.filter((emoji) => !emoji.includes("#"));
    const emojisNoNumber = emojisNoSharp === null || emojisNoSharp === void 0 ? void 0 : emojisNoSharp.filter((emoji) => !emoji.match(/\d+/g));
    if (emojisNoNumber) {
        const emoji = emojisNoNumber[0];
        // convert to string
        if (!emoji)
            return "";
        return emoji.toString();
    }
    return "";
}
exports.extractPrimaryEmoji = extractPrimaryEmoji;
