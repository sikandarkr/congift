import React from 'react';
import UiContainer from '../../shared/components/UiContainer';
import { StyleSheet, View, TouchableOpacity, Text, TextInput, Alert } from "react-native";
import { connect } from 'react-redux';
import { COMMON_COLORS } from '../../constants/colors';
import { compose } from 'redux';
import withLoader from '../../utils/withLoaderHOC';
import { setLoading } from '../../store/actions/commonActions';
import { COMMON_STYLES } from '../../constants/styles';
import AppIcon from '../../shared/components/AppIcon';
import { ICONS } from '../../constants/icons';
import { normalize } from '../../utils/common.util';
import { axiosPost } from '../../core/api-service';
import { API } from '../../config/api';
import { CITY_NAME, CITY_CODE } from '../../constants/common';
import { storeLocation } from '../../store/actions/locationAction';
import { signIn } from '../../store/actions/userActions';
import { Logger } from '../../core/logger-service';
import {NavigationActions, StackActions, withNavigation } from 'react-navigation';

class VerifyOTP extends React.Component {
    state = {
        arrowBGColor: '#CDCDCD',
        submitButtonDisabled:true,
        OTP : '',
        error : false,
        errorMsg: ''
    }

    onChangeText(text){
        if(text.length === 6){
            this.setState({arrowBGColor:'#F73C73',submitButtonDisabled:false, OTP:text})
        }else{
            this.setState({arrowBGColor:'#CDCDCD',submitButtonDisabled:true, OTP:''})
        }
    }

    verifyOTP = () => {
        this.props.setLoading(true);
        const { navigation} = this.props;
        const { params } = navigation.state;

        let data = { otp: this.state.OTP };
        let api;
        
        if (params.type === 'mobile') {
            api = API.VERIFY_OTP_REGISTER;
            data.user = params.user.uuid;
        } else {
            api = API.SOCIAL_LOGIN_VERIFY_MOBILE;
            data.user = params.mobileNumber;
        }

        axiosPost(api, data)
        .then(
            res => {
                if(res.status === 406){   //If OTP is wrong
                    this.setState({error:true, errorMsg:'You have entered wrong code'})
                }else if(res.status === 200){
                    this.setState({error:false, errorMsg:''})
                    if (params.type === 'mobile') {
                        this.props.navigation.navigate('ChangePassword', { new: true, user: params.user });
                    }else{
                        this.props.storeUser({ ...res.data});
                        this.props.storeLocation({ name: CITY_NAME, code: CITY_CODE});
                        //this.props.navigation.navigate('ProfileName');
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
                    }
                }
                this.props.setLoading(false);
            }
        )
        .catch(
            err => {
                //Logger.Error('Login Form js', 'fbLogin', err);
                console.log("Social Media verify otp err:" + err);
                this.props.setLoading(false);
            }
        );
    }

    resendOTP = async() => {
        const { navigation} = this.props;
        const { params } = navigation.state;

        let data = { mobile: params.mobileNumber };
        let api;
        
        if (params.type === 'mobile') {
            api = API.REGISTER;
            data.name = params.name;
        } else {
            const { navigation} = this.props;
            const { params } = navigation.state;
            const fbToken = params.fbToken;

            api = API.SOCIAL_LOGIN;
            data.social_media_type = 'Facebook';
            data.token = fbToken;
        }

        axiosPost(api, data)
            .then(
                (res) => {
                    if(res.status === 206 || res.status === 200){
                        Alert.alert(
                            'OTP sent successfully'
                        );
                    }else{
                        Alert.alert(
                            'Something went wrong please try again later!'
                        );
                    }
                }
            )
            .catch(err => Logger.Error('resend otp', 'submit', err));
    }

    _backEvent = () => {
        const { navigation} = this.props;
        const { params } = navigation.state;
        if (params.type === 'mobile') {
            navigation.goBack();
        }else{
            this.props.navigation.navigate('VerifyNumber', { previous_screen:'OTP'});
        }
    }

    render() {
        const { navigation } = this.props;
        const { params } = navigation.state;
        const mobileNumber = params.mobileNumber;

        return (
            <UiContainer title={'OTP'} noFooter noBorder backEvent onBack={() => { this._backEvent() }}>
                <View style={[COMMON_STYLES.COLUMN_FLEX]}>
                    <View style={{width:185, height:72, top:50, left:47}}>
                        <Text style={[COMMON_STYLES.TITLE_TEXT_SIZE, COMMON_STYLES.FONT_POPPINSREGULAR, COMMON_STYLES.PRIMARY_COLOR,{textAlign:'left'}]}>Enter the 6 digit OTP Code</Text>
                    </View>
                    <View style={{top:50, width:266, left:47}}>
                        <Text style={[{textAlign:'left', color:'#666666'}, COMMON_STYLES.FONT_POPPINSREGULAR, COMMON_STYLES.REGULAR_TEXT]}>Enter the 6 digit code which is sent to xxxxxxx{mobileNumber.slice(-3)}. Please wait for the code as this process will take 2 min.</Text>
                    </View>
                    <View stlye={{flex:1, flexDirection:'row'}}>
                        <View style={{left:47, top:normalize(70), width:200}}>
                            <TextInput
                                autoFocus={true}
                                keyboardType='numeric'
                                placeholder={"999999"}
                                placeholderTextColor={COMMON_COLORS.BORDERLINE} 
                                style={[{fontSize:32, color:'#666666', textAlignVertical:'auto'},COMMON_STYLES.FONT_POPPINSREGULAR]}
                                maxLength={6}
                                returnKeyType="done"
                                selectionColor={'#000000'}
                                onChangeText={this.onChangeText.bind(this)}
                            />
                        </View>
                        <View style={[{top:30, left:280}]}>                            
                            <TouchableOpacity disabled={this.state.submitButtonDisabled} onPress={() => this.verifyOTP()}
                                style={{
                                    borderWidth:1,
                                    borderColor:'rgba(0,0,0,0.2)',
                                    alignItems:'center',
                                    justifyContent:'center',
                                    width:normalize(40),
                                    height:normalize(40),
                                    backgroundColor: this.state.arrowBGColor,
                                    borderRadius:50,
                                    position:'absolute'
                                  }}
                            >
                                <AppIcon name={ICONS.RIGHT_ARROW} />
                            </TouchableOpacity>
                        </View>
                        { this.state.error === true ?
                            <View style={{left:47, top:normalize(75), width:151}}>
                                <Text style={[COMMON_STYLES.LOCATION_TEXT_SIZE, COMMON_STYLES.TEXT_CENTER, COMMON_STYLES.FONT_POPPINSREGULAR, { color: '#FD1414', lineHeight:15}]}>{this.state.errorMsg}</Text>
                            </View>
                        : null
                        }
                        <View style={{left:145, width:normalize(71), alignItems:'center', top:normalize(100)}}>
                            <TouchableOpacity onPress={() => this.resendOTP()}>
                                <Text style={[COMMON_STYLES.SMALL_TEXT_SIZE, COMMON_STYLES.TEXT_CENTER, COMMON_STYLES.FONT_POPPINSREGULAR, { color: COMMON_COLORS.PRIMARY}]}>Resend OTP</Text>
                            </TouchableOpacity>
                        </View>
                    </View>                    
                </View>
            </UiContainer>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    storeUser: (user) => dispatch(signIn(user)),
    setLoading: (s) => dispatch(setLoading(s)),
    storeLocation: (location) => dispatch(storeLocation(location))
})
export default compose(
    connect(null, mapDispatchToProps),
    withLoader)(VerifyOTP);

const styles = StyleSheet.create({
    errBlock: { marginTop: 20 }
});
