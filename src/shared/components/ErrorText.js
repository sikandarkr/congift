import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { COMMON_COLORS } from '../../constants/colors';
import { COMMON_STYLES } from '../../constants/styles';

const ErrorText = (props) => {
    return <View>
        <Text style={[COMMON_STYLES.TEXT_CENTER, COMMON_STYLES.SMALL_TEXT_SIZE, styles.error, COMMON_STYLES.LOW_VERTICAL_MARGIN]}>{props.children}</Text>
    </View>
}
export default ErrorText;
const styles = StyleSheet.create({
    error: { color: COMMON_COLORS.DANGER }
});