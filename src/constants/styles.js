import { StyleSheet, Platform } from 'react-native';
import { normalize } from '../utils/common.util';
import { COMMON_COLORS } from './colors';
import { FONTS } from './fonts';
//import Constants from 'expo-constants';

const createStyle = (style) => {
    return StyleSheet.create({ style }).style;
}

const normalizePlatform = (size) => {
    const platform = Platform.OS;
    return platform === 'ios' ? normalize(size + 4) : normalize(size);
}
export const COMMON_STYLES = {
    BLUE_BUTTON: createStyle({ backgroundColor: '#3367d6', borderRadius: normalize(5), padding: normalize(5) }),
    TEXT_WHITE: createStyle({ color: COMMON_COLORS.WHITE }),
    MARGIN_RIGHT: createStyle({ marginRight: normalize(10) }),
    MARGIN_TOP: createStyle({ marginTop: normalize(10) }),
    MARGIN_LEFT: createStyle({ marginLeft: normalize(10) }),
    MARGIN_BOTTOM: createStyle({ marginBottom: normalize(10) }),
    LOW_HORIZONTAL_MARGIN: createStyle({ marginHorizontal: normalize(5) }),
    LOW_VERTICAL_MARGIN: createStyle({ marginVertical: normalize(5) }),
    MODERATE_HORIZONTAL_MARGIN: createStyle({ marginHorizontal: Platform.OS === 'ios' ? normalize(5) : normalize(10) }),
    MODERATE_VERTICAL_MARGIN: createStyle({ marginVertical: Platform.OS === 'ios' ? normalize(5) : normalize(10) }),
    HORIZONTAL_MARGIN: createStyle({ marginHorizontal: Platform.OS === 'ios' ? normalize(10) : normalize(20) }),
    VERTICAL_MARGIN: createStyle({ marginVertical: Platform.OS === 'ios' ? normalize(10) : normalize(20) }),
    LOW_HORIZONTAL_PADDING: createStyle({ paddingHorizontal: normalize(5) }),
    LOW_VERTICAL_PADDING: createStyle({ paddingVertical: normalize(5) }),
    MODERATE_HORIZONTAL_PADDING: createStyle({ paddingHorizontal: Platform.OS === 'ios' ? normalize(5) : normalize(10) }),
    MODERATE_VERTICAL_PADDING: createStyle({ paddingVertical: Platform.OS === 'ios' ? normalize(5) : normalize(10) }),
    HORIZONTAL_PADDING: createStyle({ paddingHorizontal: Platform.OS === 'ios' ? normalize(10) : normalize(20) }),
    VERTICAL_PADDING: createStyle({ paddingVertical: Platform.OS === 'ios' ? normalize(10) : normalize(20) }),
    DEFAULT_TEXT_SIZE: createStyle({ fontSize: normalize(14), lineHeight: normalizePlatform(18) }),
    SMALL_TEXT_SIZE: createStyle({ fontSize: normalize(12), lineHeight: normalizePlatform(14) }),
    SMALL_TITLE_TEXT_SIZE: createStyle({ fontSize: normalize(16), lineHeight: normalizePlatform(22) }),
    TITLE_TEXT_SIZE: createStyle({ fontSize: normalize(18), lineHeight: normalizePlatform(24) }),
    LOCATION_TEXT_SIZE: createStyle({ fontSize: normalize(10), lineHeight: normalizePlatform(12) }),
    DOT_TEXT_SIZE: createStyle({ fontSize: normalize(35) }),
    CART_ITEM_CLOSE_SIZE: createStyle({ fontSize: normalize(24) }),
    FONT_NOTOSANS: createStyle({ fontFamily: FONTS.NOTOSANS }),
    FONT_NOTOSANSMEDIUM: createStyle({ fontFamily: FONTS.NOTOSANSMEDIUM }),
    FONT_ROBOTO: createStyle({ fontFamily: FONTS.ROBOTO }),
    FONT_ROBOTOMEDIUM: createStyle({ fontFamily: FONTS.ROBOTOMEDIUM }),
    FONT_GOTHAM: createStyle({ fontFamily: FONTS.GOTHAM }),
    FONT_GOTHAMMEDIUM: createStyle({ fontFamily: FONTS.GOTHAMMEDIUM }),
    FONT_POPPINSBOLD: createStyle({ fontFamily: FONTS.POPPINSBOLD }),
    FONT_POPPINSMEDIUM: createStyle({ fontFamily: FONTS.POPPINSMEDIUM }),
    FONT_POPPINSLIGHT: createStyle({ fontFamily: FONTS.POPPINSLIGHT }),
    FONT_POPPINSREGULAR: createStyle({ fontFamily: FONTS.POPPINSREGULAR }),
    FLEX_CENTER: createStyle({ alignItems: 'center', justifyContent: 'center' }),
    ROW_FLEX: createStyle({ flex: 1, flexDirection: 'row' }),
    COL_FLEX: createStyle({ flex: 1, flexDirection: 'column' }),
    FLEX_START: createStyle({ alignItems: 'flex-start', justifyContent: 'flex-start' }),
    TEXT_LEFT: createStyle({ textAlign: 'left', alignItems: 'flex-start' }),
    TEXT_RIGHT: createStyle({ textAlign: 'right', alignItems: 'flex-end' }),
    TEXT_CENTER: createStyle({ textAlign: 'center', alignItems: 'center' }),
    REGULAR_TEXT: createStyle({ fontSize: normalize(12) }),
    BRAND_TEXT: createStyle({ fontSize: normalize(12), lineHeight: normalizePlatform(14), color: COMMON_COLORS.PRIMARY }),
    PRODUCT_TITLE_TEXT: createStyle({ fontSize: normalize(14), lineHeight: normalizePlatform(16) }),
    PRODUCT_MRP_TEXT: createStyle({ color: COMMON_COLORS.DARK_GRAY, fontSize: normalize(12), textDecorationLine: 'line-through' }),
    PRIMARY_COLOR: createStyle({ color: COMMON_COLORS.PRIMARY }),
    GRAY_COLOR: createStyle({ color: COMMON_COLORS.DARK_GRAY }),
    NORMAL_COLOR: createStyle({ color: 'black' }),
    WHITE_COLOR: createStyle({ color: 'white' }),
    BOLD_TEXT: createStyle({ fontWeight: 'bold' }),
    PADDER: createStyle({ paddingHorizontal: Platform.OS === 'ios' ? normalize(10) : normalize(20) }),
    TOP_BORDER: createStyle({ borderTopWidth: 1, borderTopColor: COMMON_COLORS.BORDERLINE_BG }),
    BOTTOM_BORDER: createStyle({ borderBottomWidth: 1, borderBottomColor: COMMON_COLORS.BORDERLINE_BG }),
    GRAY_BACKGROUND: createStyle({ backgroundColor: COMMON_COLORS.BG }),
    PRIMARY_BACKGROUND: createStyle({ backgroundColor: COMMON_COLORS.PRIMARY }),
    SPACE_BETWEEN: createStyle({ alignItems: 'center', justifyContent: 'space-between' }),
    //STATUS_BAR_PADDING: createStyle({ paddingTop: Constants.statusBarHeight }),
    TEST_BORDER: createStyle({ borderWidth: 1, borderColor: COMMON_COLORS.PRIMARY })
}
