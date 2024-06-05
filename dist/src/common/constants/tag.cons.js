"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTagColor = exports.CONS_TAG_COLOR_LIST = exports.CONS_TAG_COLOR_GRAY = exports.CONS_TAG_COLOR_ORANGE = exports.CONS_TAG_COLOR_BROWN = exports.CONS_TAG_COLOR_TEA = exports.CONS_TAG_COLOR_GREEN = exports.CONS_TAG_COLOR_TEAL = exports.CONS_TAG_COLOR_SKY = exports.CONS_TAG_COLOR_BLUE = exports.CONS_TAG_COLOR_PURPLE = exports.CONS_TAG_COLOR_MAGENTA = exports.CONS_TAG_COLOR_PINK = exports.CONS_TAG_COLOR_RED = void 0;
const CONST_TAG_COLOR_MAP = {
    red: "#d16060",
    pink: "#d75fb1",
    magenta: "#bc52da",
    purple: "#9564ef",
    blue: "#558ae8",
    sky: "#2f96dc",
    teal: "#209ea2",
    green: "#1b9851",
    lime: "#9d9d00",
    brown: "#a7a61b",
    orange: "#d56f0c",
    gray: "#5d6469",
};
exports.CONS_TAG_COLOR_RED = "red";
exports.CONS_TAG_COLOR_PINK = "pink";
exports.CONS_TAG_COLOR_MAGENTA = "magenta";
exports.CONS_TAG_COLOR_PURPLE = "purple";
exports.CONS_TAG_COLOR_BLUE = "blue";
exports.CONS_TAG_COLOR_SKY = "sky";
exports.CONS_TAG_COLOR_TEAL = "teal";
exports.CONS_TAG_COLOR_GREEN = "green";
exports.CONS_TAG_COLOR_TEA = "lime";
exports.CONS_TAG_COLOR_BROWN = "brown";
exports.CONS_TAG_COLOR_ORANGE = "orange";
exports.CONS_TAG_COLOR_GRAY = "gray";
exports.CONS_TAG_COLOR_LIST = [
    exports.CONS_TAG_COLOR_RED,
    exports.CONS_TAG_COLOR_BLUE,
    exports.CONS_TAG_COLOR_PINK,
    exports.CONS_TAG_COLOR_GREEN,
    exports.CONS_TAG_COLOR_ORANGE,
    exports.CONS_TAG_COLOR_MAGENTA,
    exports.CONS_TAG_COLOR_SKY,
    exports.CONS_TAG_COLOR_PURPLE,
    exports.CONS_TAG_COLOR_TEAL,
    exports.CONS_TAG_COLOR_TEA,
    exports.CONS_TAG_COLOR_GRAY,
    exports.CONS_TAG_COLOR_BROWN,
];
function getTagColor(tagColor) {
    switch (tagColor) {
        case exports.CONS_TAG_COLOR_RED:
            return CONST_TAG_COLOR_MAP.red;
        case exports.CONS_TAG_COLOR_PINK:
            return CONST_TAG_COLOR_MAP.pink;
        case exports.CONS_TAG_COLOR_MAGENTA:
            return CONST_TAG_COLOR_MAP.magenta;
        case exports.CONS_TAG_COLOR_PURPLE:
            return CONST_TAG_COLOR_MAP.purple;
        case exports.CONS_TAG_COLOR_BLUE:
            return CONST_TAG_COLOR_MAP.blue;
        case exports.CONS_TAG_COLOR_SKY:
            return CONST_TAG_COLOR_MAP.sky;
        case exports.CONS_TAG_COLOR_TEAL:
            return CONST_TAG_COLOR_MAP.teal;
        case exports.CONS_TAG_COLOR_GREEN:
            return CONST_TAG_COLOR_MAP.green;
        case exports.CONS_TAG_COLOR_TEA:
            return CONST_TAG_COLOR_MAP.lime;
        case exports.CONS_TAG_COLOR_BROWN:
            return CONST_TAG_COLOR_MAP.brown;
        case exports.CONS_TAG_COLOR_ORANGE:
            return CONST_TAG_COLOR_MAP.orange;
        case exports.CONS_TAG_COLOR_GRAY:
            return CONST_TAG_COLOR_MAP.gray;
        default:
            return CONST_TAG_COLOR_MAP.red;
    }
}
exports.getTagColor = getTagColor;
