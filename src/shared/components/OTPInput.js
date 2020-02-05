import React from 'react';
import { TextInput, View } from 'react-native';
import { normalize } from '../../utils/common.util';
import { COMMON_COLORS } from '../../constants/colors';
import { COMMON_STYLES } from '../../constants/styles';

class OtpInput extends React.Component {

    state = { otp: [] };

    otpTextInput = [];

    componentDidMount() {
        this.otpTextInput[0].focus();
    }

    static getDerivedStateFromProps(props) {
        if (props.clearInput) {
            return { otp: [] };
        }
        return null;
    }

    componentDidUpdate() {
        if (this.state.otp.length === 0) { this.otpTextInput[0].focus(); }
    }

    renderInputs() {
        const inputs = Array(6).fill(0);
        const txt = inputs.map(
            (i, j) => (
                <View key={j} style={[COMMON_STYLES.LOW_HORIZONTAL_MARGIN, { flex: 1 / 6, borderRadius: 4, borderColor: COMMON_COLORS.DARK_GRAY, borderWidth: 1, alignItems: 'center' }]}>
                    <TextInput
                        style={[{ width: normalize(40), height: normalize(40) }, COMMON_STYLES.DEFAULT_TEXT_SIZE, COMMON_STYLES.TEXT_CENTER]}
                        keyboardType="phone-pad"
                        maxLength={1}
                        returnKeyType="done"
                        value={this.state.otp[j]}
                        onChangeText={(v) => this.focusNext(j, v)}
                        onKeyPress={e => this.focusPrevious(e.nativeEvent.key, j)}
                        ref={ref => this.otpTextInput[j] = ref}
                        autoFocus={j === 0 ? true : false}
                    />
                </View>
            )
        );
        return txt;
    }

    focusPrevious(key, index) {
        if (key === 'Backspace' && index !== 0)
            this.otpTextInput[index - 1].focus();
    }

    focusNext(index, value) {
        //console.log(index, value);
        if (index < this.otpTextInput.length - 1 && value) {
            this.otpTextInput[index + 1].focus();
        }
        if (index === this.otpTextInput.length - 1) {
            this.otpTextInput[index].blur();
        }
        const otp = this.state.otp;
        otp[index] = value;
        this.setState({ otp });
        this.props.getOtp(otp);
    }

    render() {
        //console.log(this.otpTextInput[0]);
        return (
            <View style={[{ flexDirection: 'row', alignItems: 'center' }, COMMON_STYLES.PADDER]}>
                {this.renderInputs()}
            </View>
        );
    }
}

export default OtpInput;
