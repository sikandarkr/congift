import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { PHONE_VALIDATIONS, NAME_VALIDATIONS } from '../../constants/validations';
import UiContainer from '../../shared/components/UiContainer';
import { normalize } from '../../utils/common.util';
import { COMMON_COLORS } from '../../constants/colors';
import { COMMON_STYLES } from '../../constants/styles';
import SocialMediaLogin from '../../components/user/SocialMediaLogin';
import { checkAllValidationStatus } from '../../core/validation-service';
import { CITY_NAME, CITY_CODE } from '../../constants/common';
import { storeLocation } from '../../store/actions/locationAction';
import { compose } from 'redux';
import { connect } from 'react-redux';
import ErrorText from '../../shared/components/ErrorText';
import { setLoading } from '../../store/actions/commonActions';
import withLoader from '../../utils/withLoaderHOC';
import { axiosPost } from '../../core/api-service';
import { API } from '../../config/api';
import ShowErrors from '../../shared/components/ShowErrors';

class SignUp extends React.Component {
    state = { name: '', mobile: '', hasError: false, hasIssue: false, display: false, errorMsg: null };

    skipNavigation = () => {
        this.props.storeLocation({ name: CITY_NAME, code: CITY_CODE});
        this.props.navigation.navigate('Main');
    }

    validateNRegister = () => {
        this.setState({ hasError: false, hasIssue: false, display: true });
        const { mobile, name } = this.state;
        const vals = [{ value: mobile, validators: PHONE_VALIDATIONS }, { value: name, validators: NAME_VALIDATIONS }];
        if (checkAllValidationStatus(vals)) {
            this.createUser();
        }
    }

    createUser() {
        this.setState({hasError: false, errorMsg:null, display:false});
        const user = { name: this.state.name, mobile: this.state.mobile };
        this.props.setLoading(true);
        axiosPost(API.REGISTER, user).then(
            (res) => {
                //Logger.Log('signupform.js', 'data', res);
                if (res.status === 200) {
                    this.props.navigation.navigate('VerifyOTP', { user: res.data, type: 'mobile', mobileNumber:this.state.mobile, name:this.state.name });
                }else if(res.status === 406) {
                    this.setState({hasError:true, errorMsg:res.data.message, display: true})
                } else {
                    this.setState({ hasError: true, errorMsg:'Something went wrong, please try again later.',display: true });
                }
                this.props.setLoading(false);
            }
        ).catch(
            err => {
                //Logger.Error('signupform.js', 'error', err);
                console.log("error:" + err);
                this.props.setLoading(false);
                this.setState({ hasError: true, errorMsg:'Something went wrong, please try again later.',display: true });
            }
        )
    }

    _renderError = () => {
        if (this.state.hasError) {
            return (
            <View style={{top:normalize(30)}}>
                <ErrorText>{this.state.errorMsg}</ErrorText>
            </View>)
        }
        return null;
    }

    formatInput = () => {
        const inputText = this.state.name;
        this.setState({ name: inputText.trim()});
    }

    render() {
        return (
            <UiContainer title={'Sign Up'} noFooter noBorder skip onTap={() => this.skipNavigation()}>
                <View style={{alignItems:'center', top:normalize(40)}}>
                    <SocialMediaLogin />
                    <Text style={[COMMON_STYLES.FONT_POPPINSREGULAR,{color: '#a6a6a6', paddingTop: 25}]}>Or</Text>
                    <View style={{width:280, top:normalize(16)}}>
                        <TextInput
                            style={[styles.TextComponentStyle, COMMON_STYLES.FONT_POPPINSREGULAR]}
                            placeholder="Name"
                            onChangeText={v => this.setState({ name: v })}
                            underlineColorAndroid="transparent"
                            value={this.state.name}
                            maxLength={40}
                            onBlur={e => this.formatInput()}
                        />
                        <ShowErrors value={this.state.name} validations={NAME_VALIDATIONS} display={this.state.display}></ShowErrors>

                        <TextInput
                            keyboardType='numeric'
                            placeholder={"Phone No."}
                            placeholderTextColor={COMMON_COLORS.BORDERLINE} 
                            style={[styles.TextComponentStyle, COMMON_STYLES.FONT_POPPINSREGULAR,{top:normalize(17)}]}
                            maxLength={10}
                            returnKeyType="done"
                            selectionColor={'#000000'}
                            onChangeText={(v) => this.setState({ mobile: v })}
                        />  
                        <View style={{top:normalize(20)}}><ShowErrors value={this.state.mobile} validations={PHONE_VALIDATIONS} display={this.state.display}></ShowErrors></View>
                        {this._renderError()}
                        <View style={{top: normalize(40)}}>
                            <TouchableOpacity
                                style={{
                                    position:'absolute',
                                    width:280,
                                    height:46,
                                    backgroundColor: '#F73C73',
                                    borderRadius:5
                                }}
                                onPress = {() => this.validateNRegister()}
                            >
                                <View style={[COMMON_STYLES.FLEX_CENTER, COMMON_STYLES.ROW_FLEX]}>
                                    <Text style={[COMMON_STYLES.DEFAULT_TEXT_SIZE, COMMON_STYLES.TEXT_CENTER, COMMON_STYLES.FONT_POPPINSREGULAR,{ color: COMMON_COLORS.WHITE}]}>Sign up</Text>
                                </View>                            
                            </TouchableOpacity>
                        </View>
                        <View style={{top:normalize(100),alignItems:'center'}}>
                            <Text style={[COMMON_STYLES.FONT_POPPINSREGULAR,{color:'#000000'}]}>Already Registered</Text>
                            <Text style={[COMMON_STYLES.FONT_POPPINSREGULAR, COMMON_STYLES.PRIMARY_COLOR, { alignSelf:'center'}]} onPress={() => this.props.navigation.navigate("SignIn")}>Sign In</Text>
                        </View>
                    </View>
                </View>
            </UiContainer>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    setLoading: (s) => dispatch(setLoading(s)),
    storeLocation: (location) => dispatch(storeLocation(location))
});

export default compose(
    connect(null, mapDispatchToProps),
    //withNavigation,
    withLoader
)(SignUp);

const styles = StyleSheet.create({
    TextComponentStyle: {
        borderRadius: 5,
        borderWidth: 1, 
        borderColor: '#CDCDCD',
        color: '#BCBCBC',
        backgroundColor : '#FFFFFF',
        padding : 10,    
        fontSize: 14,    
        textAlign: 'left',
        height:45
      }
});