/** Canonical paths from `public/assets/strivn_brand_assets_pack`. */

const PACK = "/assets/strivn_brand_assets_pack";

export const BRAND_ASSETS = {
  lockup: {
    black: `${PACK}/strivn_full_logo_black_transparent.png`,
    white: `${PACK}/strivn_full_logo_white_transparent.png`,
    blackOnWhite: `${PACK}/strivn_full_logo_black_on_white.png`,
    whiteOnBlack: `${PACK}/strivn_full_logo_white_on_black.png`,
  },
  wordmark: {
    black: `${PACK}/strivn_wordmark_black_transparent.png`,
    white: `${PACK}/strivn_wordmark_white_transparent.png`,
  },
  cube: {
    black: `${PACK}/strivn_cube_mark_black_transparent.png`,
    white: `${PACK}/strivn_cube_mark_white_transparent.png`,
  },
  arrow: {
    black: `${PACK}/strivn_arrow_icon_black.svg`,
    blackFilled: `${PACK}/strivn_arrow_icon_black_filled.svg`,
    white: `${PACK}/strivn_arrow_icon_white.svg`,
    orange: `${PACK}/strivn_arrow_icon_orange.svg`,
    orangeFilled: `${PACK}/strivn_arrow_icon_orange_filled.svg`,
    blackOnWhite: `${PACK}/strivn_arrow_icon_black_on_white.png`,
    whiteOnBlack: `${PACK}/strivn_arrow_icon_white_on_black.png`,
  },
} as const;
