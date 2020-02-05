import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { PHONE_VALIDATIONS, REQUIRED_VALIDATIONS } from '../../constants/validations';
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
import { signIn } from '../../store/actions/userActions';
import ErrorText from '../../shared/components/ErrorText';
import { setLoading } from '../../store/actions/commonActions';
import withLoader from '../../utils/withLoaderHOC';
import { NavigationActions, StackActions, withNavigation } from 'react-navigation';
import { axiosPost } from '../../core/api-service';
import { API } from '../../config/api';
import ShowErrors from '../../shared/components/ShowErrors';
import Icon from 'react-native-vector-icons/Ionicons';

class SignIn extends React.Component {
    state = {
        mobile: '',
        password: '',
        hasError: false,
        display: false,
        resetError: false,
        errorMsg: null,
        mobileError: null,
        passwordError: null,
        resetInvalidPhoneNumberError: null,
        icon: "md-eye-off",
        showPassword: true,
    };

    skipNavigation = () => {
        this.props.storeLocation({ name: CITY_NAME, code: CITY_CODE});
        this.props.navigation.navigate('Main');
    }

    validateNLogin = () => {
        this.setState({ hasError: false, display: true, errorMsg: null });
        const { mobile, password } = this.state;
        const vals = [{ value: mobile, validators: PHONE_VALIDATIONS }, { value: password, validators: REQUIRED_VALIDATIONS }];
        if (checkAllValidationStatus(vals)) {
            this.login();
        }
    }

    login = () => {
        this.setState({ hasError: false, display: false, resetError: false, errorMsg: null });
        const data = {
            username: this.state.mobile,
            password: this.state.password
        };
        this.props.setLoading(true);
        axiosPost(API.LOGIN, data)
            .then(res => {
                if (res.status === 200) {
                    this.props.storeUser({ ...res.data, mobile: this.state.mobile });
                    this.props.storeLocation({ name: CITY_NAME, code: CITY_CODE});

                    const goTo = this.props.navigation.getParam('backTo') || 'Main';
                    const mode = this.props.navigation.getParam('mode') || 'normal';

                    const resetAction = StackActions.reset({
                        index: 1,
                        actions: [
                            NavigationActions.navigate({ routeName: 'Main' }),
                            NavigationActions.navigate({ routeName: goTo, params: { mode: mode } })
                        ],
                    });
                    this.props.navigation.dispatch(resetAction);
                } else if (res.status === 401) {
                    this.setState({ hasError: true, errorMsg:'Something went wrong, please try again later.',display: false });
                } else if(res.status === 406) {
                    if(res.data.error && res.data.error === 'invalid_credentials') {
                        this.setState({hasError:true, errorMsg:'Invalid Phone number or Password', display: false})
                    }else if(res.data.error && res.data.error === 'invalid_user') {
                        this.setState({hasError:true, errorMsg:'User has not been registered with Giftiicon', display: false, mobile:'', password:''})
                    }else if(res.data.error && res.data.error === 'invalid_login_source') {
                        this.setState({hasError:true, errorMsg:'User has not been registered with Giftiicon. Please login with social media login', display: false, mobile:'', password:''})
                    }
                }
                this.props.setLoading(false);
            })
            .catch(() => {
                this.setState({ hasError: true, display: false });
                this.props.setLoading(false);
            });
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

    initiateResetPassword() {
        this.setState({ resetError: false, resetInvalidPhoneNumberError: null });
        if (this.state.mobile === '') {
            this.setState({ resetError: true });
        } else {
            this.props.setLoading(true);
            axiosPost(API.FORGOT_PASSWORD, { user: this.state.mobile })
                .then(
                    res => {
                        if (res.status === 200) {
                            this.props.navigation.navigate('VerifyEmail', {
                                type: res.data.mail === '' ? 'mobile' : 'email',
                                flow: 'reset',
                                email: res.data.mail,
                                user: { mobile: res.data.mobile }
                            });
                        } else if(res.status === 406) {
                            if(res.data.message === 'User is not valid') {
                                this.setState({ resetInvalidPhoneNumberError: 'Mobile number does\'t exists' });
                            }
                            if(res.data.message === 'Please login via Facebook') {
                                this.setState({ resetInvalidPhoneNumberError: 'Mobile number has been registered with Social Media Login' });
                            }
                        }
                        this.props.setLoading(false);
                    }
                ).catch(err => {
                    Logger.Error('reset', '', err);
                    this.props.setLoading(false);
                });
        }
    }

    _changeIcon() {
        this.setState(prevState => ({
            icon: prevState.icon === 'md-eye' ? 'md-eye-off' : 'md-eye',
            showPassword: !prevState.showPassword
        }));
    }

    render() {
        return (
            <UiContainer title={'Logon'} noFooter noBorder noBack skip onTap={() => this.skipNavigation()}>
                <View style={{alignItems:'center', top:normalize(40)}}>
                    <SocialMediaLogin />
                    <Text style={[COMMON_STYLES.FONT_POPPINSREGULAR,{color: '#a6a6a6', paddingTop: 25}]}>Or</Text>
                    <View style={{width:280, top:normalize(16)}}>
                        <TextInput
                                keyboardType='numeric'
                                placeholder={"Phone No."}
                                placeholderTextColor={COMMON_COLORS.BORDERLINE}
                                onChangeText={(mobile) => this.setState({ mobile: mobile })}
                                style={[styles.TextComponentStyle, COMMON_STYLES.FONT_POPPINSREGULAR]}
                                maxLength={10}
                                returnKeyType="done"
                                selectionColor={'#000000'}
                                value={this.state.mobile}
                        />
                        <ShowErrors value={this.state.mobile} validations={PHONE_VALIDATIONS} display={this.state.display}></ShowErrors>
                        <TextInput
                            style={[styles.TextComponentStyle, COMMON_STYLES.FONT_POPPINSREGULAR, {top:normalize(17)}]}
                            placeholder="Password"
                            onChangeText={v => this.setState({ password: v })}
                            underlineColorAndroid="transparent"
                            secureTextEntry={this.state.showPassword}
                            value={this.state.password}
                        />
                        <Icon name={this.state.icon} onPress={() => this._changeIcon()} style={[COMMON_STYLES.GRAY_COLOR, COMMON_STYLES.SMALL_TITLE_TEXT_SIZE,{marginLeft:normalize(230), top:normalize(-14)}]} />
                        <View style={{top:normalize(20)}}><ShowErrors value={this.state.password} validations={REQUIRED_VALIDATIONS} display={this.state.display}></ShowErrors></View>
                        <Text style={[COMMON_STYLES.FONT_POPPINSREGULAR, COMMON_STYLES.PRIMARY_COLOR, { alignSelf:'flex-end', top:normalize(25)}]} onPress={() => this.initiateResetPassword()}>Forgot Password?</Text>
                        {this._renderError()}
                        { (this.state.resetError) ?
                            <View style={{top:normalize(20)}}>
                                <ErrorText>Enter your mobile number</ErrorText>
                            </View>
                            : null
                        }
                        { (this.state.resetInvalidPhoneNumberError) ?
                            <View style={{top:normalize(20)}}>
                                <ErrorText>{this.state.resetInvalidPhoneNumberError}</ErrorText>
                            </View>
                            : null
                        }
                        <View style={{top: normalize(40)}}>
                            <TouchableOpacity
                                style={{
                                    position:'absolute',
                                    width:280,
                                    height:46,
                                    backgroundColor: '#F73C73',
                                    borderRadius:5
                                }}
                                onPress = {() => this.validateNLogin()}
                            >
                                <View style={[COMMON_STYLES.FLEX_CENTER, COMMON_STYLES.ROW_FLEX]}>
                                    <Text style={[COMMON_STYLES.DEFAULT_TEXT_SIZE, COMMON_STYLES.TEXT_CENTER, COMMON_STYLES.FONT_POPPINSREGULAR,{ color: COMMON_COLORS.WHITE}]}>Logon</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={{top:normalize(100),alignItems:'center'}}>
                            <Text style={[COMMON_STYLES.FONT_POPPINSREGULAR,{color:'#000000'}]}>New to Giftiicon?</Text>
                            <Text style={[COMMON_STYLES.FONT_POPPINSREGULAR, COMMON_STYLES.PRIMARY_COLOR, { alignSelf:'center'}]} onPress={() => this.props.navigation.navigate("SignUp")}>Sign up</Text>
                        </View>
                    </View>
                </View>
            </UiContainer>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    storeUser: (user) => dispatch(signIn(user)),
    setLoading: (s) => dispatch(setLoading(s)),
    storeLocation: (location) => dispatch(storeLocation(location))
});

export default compose(
    connect(null, mapDispatchToProps),
    withNavigation,
    withLoader
)(SignIn);

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