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
  // gray: "#5d6469",
};

export const CONS_TAG_COLOR_RED = "red";
export const CONS_TAG_COLOR_PINK = "pink";
export const CONS_TAG_COLOR_MAGENTA = "magenta";
export const CONS_TAG_COLOR_PURPLE = "purple";
export const CONS_TAG_COLOR_BLUE = "blue";
export const CONS_TAG_COLOR_SKY = "sky";
export const CONS_TAG_COLOR_TEAL = "teal";
export const CONS_TAG_COLOR_GREEN = "green";
export const CONS_TAG_COLOR_TEA = "lime";
export const CONS_TAG_COLOR_BROWN = "brown";
export const CONS_TAG_COLOR_ORANGE = "orange";
// export const CONS_TAG_COLOR_GRAY = "gray";

export const CONS_TAG_COLOR_LIST = [
  CONS_TAG_COLOR_RED,
  CONS_TAG_COLOR_BLUE,
  CONS_TAG_COLOR_PINK,
  CONS_TAG_COLOR_GREEN,
  CONS_TAG_COLOR_ORANGE,
  CONS_TAG_COLOR_MAGENTA,
  CONS_TAG_COLOR_SKY,
  CONS_TAG_COLOR_PURPLE,
  CONS_TAG_COLOR_TEAL,
  CONS_TAG_COLOR_TEA,
  // CONS_TAG_COLOR_GRAY,
  CONS_TAG_COLOR_BROWN,
];

export function getTagColor(tagColor: string): string {
  switch (tagColor) {
    case CONS_TAG_COLOR_RED:
      return CONST_TAG_COLOR_MAP.red;
    case CONS_TAG_COLOR_PINK:
      return CONST_TAG_COLOR_MAP.pink;
    case CONS_TAG_COLOR_MAGENTA:
      return CONST_TAG_COLOR_MAP.magenta;
    case CONS_TAG_COLOR_PURPLE:
      return CONST_TAG_COLOR_MAP.purple;
    case CONS_TAG_COLOR_BLUE:
      return CONST_TAG_COLOR_MAP.blue;
    case CONS_TAG_COLOR_SKY:
      return CONST_TAG_COLOR_MAP.sky;
    case CONS_TAG_COLOR_TEAL:
      return CONST_TAG_COLOR_MAP.teal;
    case CONS_TAG_COLOR_GREEN:
      return CONST_TAG_COLOR_MAP.green;
    case CONS_TAG_COLOR_TEA:
      return CONST_TAG_COLOR_MAP.lime;
    case CONS_TAG_COLOR_BROWN:
      return CONST_TAG_COLOR_MAP.brown;
    case CONS_TAG_COLOR_ORANGE:
      return CONST_TAG_COLOR_MAP.orange;
    // case CONS_TAG_COLOR_GRAY:
    // return CONST_TAG_COLOR_MAP.gray;
    default:
      return CONST_TAG_COLOR_MAP.red;
  }
}
