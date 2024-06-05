"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractTagsFromBody = void 0;
function extractTagsFromBody(body) {
    const tags = body.match(/#[^\s^\.#]+/g) || [];
    const uniqueTags = Array.from(new Set(tags));
    return uniqueTags.map((tag) => tag.replace("#", ""));
}
exports.extractTagsFromBody = extractTagsFromBody;
