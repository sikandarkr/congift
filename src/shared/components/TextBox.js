import React from 'react';
import { View, TextInput } from 'react-native';
import { COMMON_COLORS } from '../../constants/colors';
import ShowErrors from './ShowErrors';
import { COMMON_STYLES } from '../../constants/styles';

class TextBox extends React.Component {

    state = {
        isFloating: false,
        text: ''
    }
    tRef = null;
    componentWillReceiveProps(props) {
        if (props.errorMessage && props.errorMessage !== '') {
            this.setState({ isFloating: true });
        }
    }
    updateValue(e) {
        this.setState({ text: e});
        this.props.onChange(e);
    }

    formatInput = () => {
        let inputText = this.state.text;
        if(this.state.text){
            inputText = inputText.trim();
        }
        this.setState({ text: inputText});
        this.props.onChange(inputText);
    }

    render() {
        const { label, display, validations, numeric, value, secureEntry, maxLength } = this.props;
        return (
            <View style={[COMMON_STYLES.MODERATE_VERTICAL_MARGIN]}>
                <View
                    style={[COMMON_STYLES.MODERATE_VERTICAL_PADDING, COMMON_STYLES.MODERATE_HORIZONTAL_PADDING,
                    {
                        borderBottomWidth: 2, borderColor: COMMON_COLORS.DARK_GRAY, alignItems: 'center', flexDirection: 'row'
                        , justifyContent: 'space-between'
                    }]}>
                    <TextInput
                        ref={r => this.tRef = r}
                        keyboardType={numeric ? "numeric" : "ascii-capable"}
                        placeholder={label}
                        maxLength={maxLength}
                        placeholderTextColor={COMMON_COLORS.DEFAULT_TEXT} style={[COMMON_STYLES.DEFAULT_TEXT_SIZE,{flex:1}]}
                        onChangeText={(e) => this.updateValue(e)}
                        value={value}
                        returnKeyType={"done"}
                        onBlur={e => this.formatInput()}
                        />
                </View>
                <ShowErrors value={value} validations={validations} display={display}></ShowErrors>
            </View>
        );
    }
}
export { TextBox };
