import React from 'react';
import { View, TextInput } from 'react-native';
import { COMMON_STYLES } from '../../constants/styles';
import { COMMON_COLORS } from '../../constants/colors';
export default class Input extends React.Component {

    render() {
        const { label, validations, display, onChange } = this.props;
        return (
            <View style={[COMMON_STYLES.MODERATE_VERTICAL_MARGIN]}>
                <View
                    style={[COMMON_STYLES.LOW_VERTICAL_PADDING,
                    {
                        borderBottomWidth: 2, borderColor: COMMON_COLORS.DARK_GRAY, alignItems: 'center', flexDirection: 'row'
                        , justifyContent: 'space-between'
                    }]}>
                    <TextInput
                        secureTextEntry={this.state.password}
                        placeholder={label}
                        placeholderTextColor={COMMON_COLORS.DEFAULT_TEXT} style={[COMMON_STYLES.DEFAULT_TEXT_SIZE]}
                        onChangeText={(e) => onChange(e.trim())} />
                </View>
                <ShowErrors value={this.state.text} validations={validations} display={display}></ShowErrors>
            </View>
        );
    }
}