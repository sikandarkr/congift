import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { COMMON_STYLES } from '../../constants/styles';
import { withNavigation } from 'react-navigation';
import SocialMediaLogin from '../../components/user/SocialMediaLogin';

function LoginLink({ navigation}, props) {
    return (
        <View style={{alignItems:'center'}}>
            <SocialMediaLogin />
            <Text style={[COMMON_STYLES.FONT_POPPINSREGULAR,{color: '#a6a6a6', paddingTop: 15}]}>Or</Text>
            <TouchableOpacity style={{paddingBottom: 20, paddingTop: 10}} onPress={() => navigation.navigate('SignIn', { type: 'signin' })}>
                <Text style={[COMMON_STYLES.FONT_POPPINSREGULAR, COMMON_STYLES.PRIMARY_COLOR]}>Login with Name and Mobile Number</Text>
            </TouchableOpacity>
        </View>
    );
}
export default withNavigation(LoginLink);