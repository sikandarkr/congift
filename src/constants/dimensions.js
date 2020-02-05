import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('screen');

const ONE_COL = width;
const TWO_COL = width / 2;
const THREE_COL = width / 3;
const FOUR_COL = width / 4;

export { width, height, ONE_COL, TWO_COL, THREE_COL, FOUR_COL };