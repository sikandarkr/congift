import { Dimensions, Platform, PixelRatio } from 'react-native';
const { width, height } = Dimensions.get('window');


//Guideline sizes are based on standard ~5" screen mobile device
const guidelineBaseWidth = 350;
const guidelineBaseHeight = 680;
const BASE_SCALE = width / guidelineBaseWidth;

const normalize = (size) => {
    const newSize = size * BASE_SCALE
    if (Platform.OS === 'ios') {
        return Math.round(PixelRatio.roundToNearestPixel(newSize))
    } else {
        return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2
    }
}

const scale = size => BASE_SCALE * size;
const verticalScale = size => height / guidelineBaseHeight * size;
const moderateScale = (size, factor = 0.5) => size + (scale(size) - size) * factor;

const replaceAll = (target, search, replacement) => {
    return target.split(search).join(replacement);
};

const reFormatNumber = (no) => {
    if (no.length >= 10) {
        let num = replaceAll(no, ' ', '');
        num = replaceAll(num, '+', '');
        num = replaceAll(num, '-', '');
        if (num.length === 10) { return num; }
        const indice = num.length === 11 ? 1 : 2;
        return num.substring(indice, num.length);
    } else {
        return no;
    }
}

const generateColorCode = () => {
    const colorCode = 'rgb(' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ')';
    return colorCode;
}
export { replaceAll, normalize, scale, verticalScale, moderateScale, reFormatNumber, generateColorCode };