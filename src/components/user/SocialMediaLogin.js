import React from 'react';
import { TouchableOpacity, Image, Platform } from 'react-native';
//import { FB_ID, CITY_NAME, CITY_CODE } from '../../constants/common';
import {NavigationActions, StackActions, withNavigation } from 'react-navigation';
//import { storeLocation } from '../../store/actions/locationAction';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { axiosPost } from '../../core/api-service';
import { API } from '../../config/api';
import { signIn } from '../../store/actions/userActions';
import withLoader from '../../utils/withLoaderHOC';
import { setLoading } from '../../store/actions/commonActions';
import { LoginButton, AccessToken, LoginManager } from 'react-native-fbsdk';

class SocialMediaLogin extends React.Component {

    fbLogin = async() => {
        let result;
        try{
            result = await LoginManager.logInWithPermissions(['public_profile', 'email']);
            this.loginSocialMedia(result); 
        }catch(error){
            console.log("error login to FB" + error);
        }      
    }

    loginSocialMedia = async (result) => {
        try {
            
            if(result.isCancelled){

            }else{
                let tokenResult = await AccessToken.getCurrentAccessToken();
                let token = tokenResult.accessToken.toString();
                console.log("token:" + JSON.stringify(token));
                await fetch(`https://graph.facebook.com/me?access_token=${token}&fields=id,name,email,about,picture`)
                    .then(
                        res => {
                            const data = {
                                social_media_type: 'Facebook',
                                token: token
                            }
                            axiosPost(API.SOCIAL_LOGIN, data)
                            .then(
                                res => {
                                    if(res.status === 406){
                                        if(res.data.required){
                                            if(res.data.required.indexOf("mobile") === 0){      //If mobile number required
                                                this.props.navigation.navigate('VerifyNumber', { previous_screen:'FBLogin', fbToken:token} );
                                            }
                                        }                            
                                    }else if(res.status === 206){   //If OTP verification is pending
                                        this.props.navigation.navigate('VerifyOTP', { mobileNumber: res.data.user, type: 'fblogin', fbToken:token });
                                    }else if(res.status === 200){
                                        this.props.storeUser({ ...res.data});
                                        //this.props.navigation.navigate('Main');
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
                            )
                            .catch(
                                err => {
                                    //Logger.Error('Login Form js', 'fbLogin', err);
                                    console.log("Social Media Login err:" + err);
                                }
                            );
                        }
                    );
            }
          
        } catch (e) {
          // saving error
        }
    }
    
    render() {
        return (
            <TouchableOpacity onPress={() => this.fbLogin()}>
                <Image source={require('../../../assets/facebook.jpg')} style={{width:478, height:50, resizeMode:'contain'}} resizeMethod="resize" resizeMode="contain" />
            </TouchableOpacity>
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
)(SocialMediaLogin);

//export default withNavigation(SocialMediaLogin);