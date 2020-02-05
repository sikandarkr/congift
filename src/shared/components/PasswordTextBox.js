import React from 'react';
import { View, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COMMON_COLORS } from '../../constants/colors';
import ShowErrors from './ShowErrors';
import { COMMON_STYLES } from '../../constants/styles';

class PasswordTextBox extends React.Component {
    state = {
        icon: "md-eye-off",
        password: true,
        isFloating: false,
        text: ''
    };

    _changeIcon() {
        this.setState(prevState => ({
            icon: prevState.icon === 'md-eye' ? 'md-eye-off' : 'md-eye',
            password: !prevState.password
        }));
    }
    updateValue(e) {
        this.setState({ text: e });
        this.props.onChange(e);
    }
    render() {
        const { label, validations, display, onChange } = this.props;
        return (
            <View style={[COMMON_STYLES.MODERATE_VERTICAL_MARGIN]}>
                <View
                    style={[COMMON_STYLES.LOW_VERTICAL_PADDING, COMMON_STYLES.MODERATE_HORIZONTAL_PADDING,
                    {
                        borderBottomWidth: 2, borderColor: COMMON_COLORS.DARK_GRAY, flexDirection: 'row'
                        , justifyContent: 'space-between'
                    }]}>
                    <TextInput
                        secureTextEntry={this.state.password}
                        placeholder={label}
                        returnKeyType="done"
                        placeholderTextColor={COMMON_COLORS.DEFAULT_TEXT} style={[COMMON_STYLES.DEFAULT_TEXT_SIZE, { flex: 1 }]}
                        onChangeText={(e) => this.updateValue(e.trim())} />
                    <Ionicons name={this.state.icon} style={[COMMON_STYLES.GRAY_COLOR, COMMON_STYLES.SMALL_TITLE_TEXT_SIZE, COMMON_STYLES.MARGIN_LEFT]} onPress={() => this._changeIcon()} />
                </View>
                <ShowErrors value={this.state.text} validations={validations} display={display}></ShowErrors>
            </View>
        );
    }
}

export { PasswordTextBox };
