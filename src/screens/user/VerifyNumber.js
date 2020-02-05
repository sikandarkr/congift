import React from 'react';
import UiContainer from '../../shared/components/UiContainer';
import { StyleSheet, View, TouchableOpacity, Text, TextInput, Image, Alert, InteractionManager, Dimensions } from "react-native";
import { connect } from 'react-redux';
import { compose } from 'redux';
import { COMMON_COLORS } from '../../constants/colors';
import withLoader from '../../utils/withLoaderHOC';
//import { setLoading } from '../../store/actions/commonActions';
import { COMMON_STYLES } from '../../constants/styles';
import AppIcon from '../../shared/components/AppIcon';
import { ICONS } from '../../constants/icons';
import { normalize } from '../../utils/common.util';
import Modal from "react-native-modal";
import { axiosPost } from '../../core/api-service';
import { API } from '../../config/api';
import { PHONE_VALIDATIONS } from '../../constants/validations';
import ShowErrors from '../../shared/components/ShowErrors';
import { checkAllValidationStatus } from '../../core/validation-service';

const { width, height } = Dimensions.get('screen');

class VerifyNumber extends React.Component {
    static navigationOptions = ({ navigation }) => {
        return {
          title: 'Verify Number',
        };
      };

      
    state = {
        arrowBGColor: '#CDCDCD',
        submitButtonDisabled:true ,
        modalVisible: false,
        display: false
    }

    setModalVisible(visible) {
        this.setState({modalVisible: visible});
    }
    
    onChangeText(text){
        if(text.length === 10){
            this.setState({arrowBGColor:'#F73C73',submitButtonDisabled:false,mobileNumber:text})
        }else{
            this.setState({arrowBGColor:'#CDCDCD',submitButtonDisabled:true,mobileNumber:''})
        }
    }

    verifyMobile = async() => {
        const vals = [{ value: this.state.mobileNumber, validators: PHONE_VALIDATIONS }];
        const { navigation} = this.props;
        const { params } = navigation.state;

        if (checkAllValidationStatus(vals)) {
            
            //const fbToken = await AsyncStorage.getItem('fbToken');
            const fbToken = params.fbToken;
            const data = {
                social_media_type: 'Facebook',
                token: fbToken,
                mobile: this.state.mobileNumber
            }
            axiosPost(API.SOCIAL_LOGIN, data)
            .then(
                res => { 
                    if(res.status === 200 || res.status === 206){   //If OTP verification is pending                        
                        this.setState({modalVisible: true});
                    }else if(res.status === 406){
                        this.showAlert('',res.data.message,'OK');
                    }                
                }
            )
            .catch(
                err => {
                    //Logger.Error('Login Form js', 'fbLogin', err);
                    console.log("Social Media Login err:" + err);
                }
            );
        }else{
            this.setState({display:true});
        }
    }

    updateNumber = async() => {
        this.setState({modalVisible: false});
        const { navigation} = this.props;
        const { params } = navigation.state;
        const fbToken = params.fbToken;
        this.props.navigation.navigate('VerifyOTP', { mobileNumber: this.state.mobileNumber, type: 'fblogin', fbToken:fbToken });
    }

    showAlert(toScreen, msg, text) {
        InteractionManager.runAfterInteractions(() => {
            setTimeout(() => {
                Alert.alert(
                    '',
                    msg,
                    [
                        {
                            text: text,
                            onPress: () => {
                                if (toScreen === 'signin') {
                                    this.props.navigation.navigate('SignIn', { type: 'signin' });
                                }
                                //this.props.setLoading(false);
                            },
                        }
                    ],
                    { cancelable: false }
                );
            }, 0);
        });
    }

    _cancelEvent = () => {
        const { navigation} = this.props;
        const { params } = navigation.state;
        if (params.previous_screen === 'OTP') {
            this.props.navigation.navigate('Main');
        }else{
            navigation.goBack();
        }
    }

    render() {
        const { navigation } = this.props;
        return (            
            <UiContainer noBack title={'Verify Number'} noFooter noBorder
                skip onTap={() => this._cancelEvent()} cancelLabel
            >
                <View style={styles.MainContainer}>
                    <Modal
                    style={{left:0}}
                    transparent={true}
                    animationType={"fade"}
                    deviceWidth={width}
                    deviceHeight={height}
                    visible={this.state.modalVisible} >
                        <View style={{top:normalize(-50), justifyContent: 'center', alignItems:'center', backgroundColor:'rgba(0, 0, 0, 0.5)', width:width+10, height:height+10, left:normalize(-20) }}>
                            <View style={styles.ModalInsideView}>
                                <View style={{top:normalize(0), paddingTop:normalize(0), left:normalize(120), zIndex:2, position:'absolute'}}>
                                    <Image source={require('../../../assets/icons/permissions.png')} style={{ height: normalize(57), width: normalize(49), resizeMode: 'contain', marginHorizontal: 10 }} />
                                </View>                  
                                <View style={styles.modalContent}>
                                    <View style={{top:normalize(50)}}>
                                        <Text style={[COMMON_STYLES.DEFAULT_TEXT_SIZE, COMMON_STYLES.FONT_POPPINSREGULAR, { alignSelf: 'center', color:'#666666', lineHeight:normalize(21) }]}>We take the following permission </Text>
                                    </View>
                                    <View style={{flexDirection:'row', flex:1, top:normalize(75)}}>
                                        <View style={{flex:0.5, justifyContent:'flex-start', left:normalize(17)}}>
                                            <Image source={require('../../../assets/icons/mobile_icon.png')} style={{ width: normalize(18), height:normalize(30),resizeMode: 'contain'}} />
                                        </View>
                                        <View style={{flex:2, justifyContent:'flex-start'}}>
                                            <Text style={[COMMON_STYLES.DEFAULT_TEXT_SIZE, COMMON_STYLES.FONT_POPPINSREGULAR, { alignSelf: 'flex-start', color:'#666666', lineHeight:normalize(21) }]}>Phone state permission </Text>
                                            <Text style={[COMMON_STYLES.SMALL_TEXT_SIZE, COMMON_STYLES.FONT_POPPINSREGULAR, { alignSelf: 'flex-start', color:'#666666', lineHeight:normalize(18) }]}>We need this permission to ensure the SIM card in your phone and your registered phone number match </Text>
                                        </View>
                                    </View>
                                    <View
                                        style={{
                                            borderBottomColor: '#BCBCBC',
                                            borderBottomWidth: 1,
                                            top:normalize(10)
                                        }}
                                    />
                                    <View style={[{flexDirection:'row', flex:1, top:normalize(35)}]}>
                                        <View style={{flex:0.5, justifyContent:'flex-start', left:normalize(17)}}>
                                            <Image source={require('../../../assets/icons/sms.png')} style={{ width: normalize(18), resizeMode: 'contain'}} />
                                        </View>
                                        <View style={{flex:2, justifyContent:'flex-start'}}>
                                            <Text style={[COMMON_STYLES.DEFAULT_TEXT_SIZE, COMMON_STYLES.FONT_POPPINSREGULAR, { alignSelf: 'flex-start', color:'#666666', lineHeight:21 }]}>SMS Permission </Text>
                                            <Text style={[COMMON_STYLES.SMALL_TEXT_SIZE, COMMON_STYLES.FONT_POPPINSREGULAR, { alignSelf: 'center', color:'#666666', lineHeight:18 }]}>We need this permission to send notifications on sent gift. </Text>
                                        </View>
                                    </View>
                                    <View style={{paddingBottom:normalize(20), width:normalize(265), alignItems:'center', justifyContent:'center'}}>
                                        <TouchableOpacity
                                            style={{
                                                width:normalize(230),
                                                height:normalize(46),
                                                backgroundColor:'#F73C73',
                                                borderRadius:5,
                                            }}
                                            onPress={() => this.updateNumber()}
                                        >
                                            <View style={[COMMON_STYLES.FLEX_CENTER, COMMON_STYLES.ROW_FLEX]}>
                                                <Text style={[COMMON_STYLES.DEFAULT_TEXT_SIZE, COMMON_STYLES.TEXT_CENTER, COMMON_STYLES.FONT_POPPINSREGULAR,{ color: COMMON_COLORS.WHITE}]}>Get Permission</Text>
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </Modal>
                  </View>                
                <View style={[COMMON_STYLES.COLUMN_FLEX]}>
                    <View style={{width:normalize(185), height:normalize(72), top:normalize(50), left:normalize(41)}}>
                        <Text style={[COMMON_STYLES.TITLE_TEXT_SIZE, COMMON_STYLES.FONT_POPPINSREGULAR, COMMON_STYLES.PRIMARY_COLOR,{textAlign:'left'}]}>Enter your mobile number</Text>
                    </View>
                    <View style={{top:normalize(50), width:normalize(266), left:normalize(41)}}>
                        <Text style={[{textAlign:'left', color:'#666666', lineHeight:18}, COMMON_STYLES.FONT_POPPINSREGULAR, COMMON_STYLES.REGULAR_TEXT]}>Please enter your number to associate with your giftiicon account.</Text>
                    </View>
                    <View stlye={{flex:1, flexDirection:'row'}}>
                        <View style={{left:normalize(41), top:normalize(70), width:normalize(200)}}>
                            <TextInput
                                autoFocus={true}
                                keyboardType='numeric'
                                textAlignVertical={'center'}
                                style={
                                    [
                                        {
                                            fontSize:normalize(32), 
                                            color:'#666666', 
                                            textAlign:'left', 
                                            alignItems:'center',
                                            //borderColor: '#009688',
                                            //backgroundColor: '#fff',
                                            height:normalize(60)
                                        },
                                        COMMON_STYLES.FONT_POPPINSREGULAR
                                    ]
                                }
                                placeholder={"9999999999"}
                                placeholderTextColor={COMMON_COLORS.BORDERLINE} 
                                maxLength={10}
                                returnKeyType="done"
                                selectionColor={'#000000'}
                                onChangeText={this.onChangeText.bind(this)}
                            />                            
                        </View>
                        <View style={[{top:normalize(20), left:normalize(280)}]}>                            
                            <TouchableOpacity disabled={this.state.submitButtonDisabled} onPress={() => this.verifyMobile()}
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
                        <View style={{left:normalize(41), top:normalize(70), width:normalize(200)}}>
                            <ShowErrors value={this.state.mobileNumber} validations={PHONE_VALIDATIONS} display={this.state.display}></ShowErrors>
                        </View>
                    </View>                    
                </View>
            </UiContainer>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    setLoading: s => dispatch(setLoading(s)),
    storeLocation: (location) => dispatch(storeLocation(location))
})
export default compose(
    connect(null, mapDispatchToProps),
    withLoader)(VerifyNumber);

const styles = StyleSheet.create({
    content: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 1,
        borderColor: 'rgba(0, 0, 0, 0.1)',
        position:'absolute',
        left:45,
        top: 100
    },
    modalContent: {
        backgroundColor: 'white',
        width:normalize(265),
        height:normalize(420),
        left:normalize(0),
        top:normalize(50),
        zIndex:1,
        borderRadius: 4,
        borderWidth: 0.5,
        borderColor: '#d6d7da',
    },
    MainContainer :{
        justifyContent: 'center',
        alignItems: 'center'  
    },
        
    ModalInsideView:{    
        justifyContent: 'center',
        alignItems: 'center', 
        height: normalize(420) ,
        width: '90%'
    }
});