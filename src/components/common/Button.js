import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { COMMON_STYLES } from '../../constants/styles';

export default function Button({ onPress, text, primary, noMargin }, props) {
    return (
        <TouchableOpacity onPress={() => onPress()} style={[primary ? COMMON_STYLES.PRIMARY_BACKGROUND : null, COMMON_STYLES.MODERATE_VERTICAL_PADDING, noMargin ? null : COMMON_STYLES.MODERATE_VERTICAL_MARGIN, { borderRadius: 2 }]}>
            <Text style={[COMMON_STYLES.TEXT_CENTER,COMMON_STYLES.DEFAULT_TEXT_SIZE, primary ? COMMON_STYLES.WHITE_COLOR : null]}>{text}</Text>
        </TouchableOpacity>
    );
}