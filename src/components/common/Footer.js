import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { COMMON_STYLES } from '../../constants/styles';
import { getHeaderHeight } from '../../utils/ui.util';
import { Ionicons } from 'react-native-vector-icons';
export default function Footer({ footerIcon, btn1, btn2, onBtn1Press, onBtn2Press, size = 1, Btn1Disabled }, props) {
    return (
        <View style={[COMMON_STYLES.TOP_BORDER, { height: getHeaderHeight() }]}>
            <View style={[COMMON_STYLES.ROW_FLEX]}>
                {size === 1 ? null : <TouchableOpacity style={{ flex: 1 / size }} onPress={() => onBtn2Press()}>
                    <View style={[COMMON_STYLES.FLEX_CENTER, COMMON_STYLES.COL_FLEX]}>
                        <Text style={[COMMON_STYLES.TEXT_CENTER, COMMON_STYLES.DEFAULT_TEXT_SIZE]}>{btn2}</Text>
                    </View>
                </TouchableOpacity>
                }
                <TouchableOpacity style={{ flex: 1 / size, opacity:Btn1Disabled ? 0.3 : 1}} onPress={() => onBtn1Press()}  disabled={Btn1Disabled} >
                    <View style={[COMMON_STYLES.PRIMARY_BACKGROUND, COMMON_STYLES.FLEX_CENTER, COMMON_STYLES.ROW_FLEX]}>
                        {footerIcon ? <Ionicons name={footerIcon} style={[COMMON_STYLES.WHITE_COLOR,COMMON_STYLES.DEFAULT_TEXT_SIZE,COMMON_STYLES.LOW_HORIZONTAL_MARGIN]} /> : null}
                        <Text style={[COMMON_STYLES.TEXT_CENTER, COMMON_STYLES.DEFAULT_TEXT_SIZE, COMMON_STYLES.WHITE_COLOR]}>{btn1}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    )
}