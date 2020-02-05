import React from 'react';
import { Image } from 'react-native';

const Logo = (props) => {
    return <Image source={require('../../../assets/logo.png')} resizeMode="contain" {...props} />
}
export default Logo;