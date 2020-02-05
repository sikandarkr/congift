import React from 'react';
import { Image, StyleSheet } from 'react-native';
import { ICONS } from '../../constants/icons';
import { normalize } from '../../utils/common.util';

const iconSize = normalize(18);

const AppIcon = ({ name, size }, props) => {
    return renderIcon(name, size)
}
export default AppIcon;

const renderIcon = (type, size = iconSize) => {
    switch (type) {
        case ICONS.HOME: return <Image source={require('../../../assets/icons/home_icon.png')} style={{ height: normalize(size), width: normalize(size), resizeMode: 'contain', marginHorizontal: 10 }} />
        case ICONS.GIFTBOX: return <Image source={require('../../../assets/icons/gift_box_icon.png')} style={{ height: normalize(size), width: normalize(size), resizeMode: 'contain', marginHorizontal: 10 }} />
        case ICONS.MYACCOUNT: return <Image source={require('../../../assets/icons/my_account_icon.png')} style={{ height: normalize(size), width: normalize(size), resizeMode: 'contain', marginHorizontal: 10 }} />
        case ICONS.SETTINGS: return <Image source={require('../../../assets/icons/settings_icon.png')} style={{ height: normalize(size), width: normalize(size), resizeMode: 'contain', marginHorizontal: 10 }} />
        case ICONS.SUPPORT: return <Image source={require('../../../assets/icons/support_icon.png')} style={{ height: normalize(size), width: normalize(size), resizeMode: 'contain', marginHorizontal: 10 }} />
        case ICONS.LOGOUT: return <Image source={require('../../../assets/icons/logout_icon.png')} style={{ height: normalize(size), width: normalize(size), resizeMode: 'contain', marginHorizontal: 10 }} />
        case ICONS.CART: return <Image source={require('../../../assets/icons/bag_icon.png')} style={{ height: normalize(size), width: normalize(size), resizeMode: 'contain', marginHorizontal: 10 }} />
        case ICONS.LOCATION: return <Image source={require('../../../assets/icons/location_icon.png')} style={{ height: normalize(size), width: normalize(size), resizeMode: 'contain', marginHorizontal: 10 }} />
        case ICONS.MENU: return <Image source={require('../../../assets/icons/menu_icon.png')} style={{ height: normalize(size), width: normalize(size), resizeMode: 'contain', marginHorizontal: 10 }} />
        case ICONS.BACK: return <Image source={require('../../../assets/icons/back_icon.png')} style={{ height: normalize(size), width: normalize(size), resizeMode: 'contain', marginHorizontal: 10 }} />
        case ICONS.NOSEARCH: return <Image source={require('../../../assets/icons/no_data_icon.png')} style={{ height: normalize(size), width: normalize(size), resizeMode: 'contain', marginHorizontal: 10 }} />
        case ICONS.CONTACT: return <Image source={require('../../../assets/icons/contacts_icon.png')} style={{ height: normalize(size), width: normalize(size), resizeMode: 'contain', marginHorizontal: 10 }} />
        case ICONS.NAME: return <Image source={require('../../../assets/icons/name_icon.png')} style={{ height: normalize(size), width: normalize(size), resizeMode: 'contain', marginHorizontal: 10 }} />
        case ICONS.EMAIL: return <Image source={require('../../../assets/icons/email_icon.png')} style={{ height: normalize(size), width: normalize(size), resizeMode: 'contain', marginHorizontal: 10 }} />
        case ICONS.PHONE: return <Image source={require('../../../assets/icons/phone_icon.png')} style={{ height: normalize(size), width: normalize(size), resizeMode: 'contain', marginHorizontal: 10 }} />
        case ICONS.LOCATION_PIN: return <Image source={require('../../../assets/icons/location_pin_icon.png')} style={{ height: normalize(size), width: normalize(size), resizeMode: 'contain', marginHorizontal: 10 }} />
        case ICONS.BIRTHDAY: return <Image source={require('../../../assets/icons/birthday_icon.png')} style={{ height: normalize(size), width: normalize(size), resizeMode: 'contain', marginHorizontal: 10 }} />
        case ICONS.PASSWORD: return <Image source={require('../../../assets/icons/change_password_icon.png')} style={{ height: normalize(size), width: normalize(size), resizeMode: 'contain', marginHorizontal: 10 }} />
        case ICONS.EXCHANGE: return <Image source={require('../../../assets/icons/exchange_icon.png')} style={{ height: normalize(size), width: normalize(size), resizeMode: 'contain', marginHorizontal: 10 }} />
        case ICONS.CLOSE: return <Image source={require('../../../assets/icons/close_icon.png')} style={{ height: normalize(size), width: normalize(size), resizeMode: 'contain', marginHorizontal: 10 }} />
        case ICONS.EDIT_CITY: return <Image source={require('../../../assets/icons/edit-city-icon.png')} style={{ height: normalize(size), width: normalize(size), resizeMode: 'contain', marginHorizontal: 10 }} />
        case ICONS.HELP: return <Image source={require('../../../assets/icons/help-icon.png')} style={{ height: normalize(size), width: normalize(size), resizeMode: 'contain', marginHorizontal: 10 }} />

        case ICONS.GIFT: return <Image source={require('../../../assets/icons/gift.png')} style={{ height: normalize(size), width: normalize(size), resizeMode: 'contain', marginHorizontal: 10 }} />
        case ICONS.ACTIVE_GIFT: return <Image source={require('../../../assets/icons/active_gift.png')} style={{ height: normalize(size), width: normalize(size), resizeMode: 'contain', marginHorizontal: 10 }} />
        case ICONS.TEASE: return <Image source={require('../../../assets/icons/tease.png')} style={{ height: normalize(size), width: normalize(size), resizeMode: 'contain', marginHorizontal: 10 }} />
        case ICONS.ACTIVE_TEASE: return <Image source={require('../../../assets/icons/active_tease.png')} style={{ height: normalize(size), width: normalize(size), resizeMode: 'contain', marginHorizontal: 10 }} />
        case ICONS.MORE: return <Image source={require('../../../assets/icons/more.png')} style={{ height: normalize(size), width: normalize(size), resizeMode: 'contain', marginHorizontal: 10 }} />
        case ICONS.ACTIVE_MORE: return <Image source={require('../../../assets/icons/active_more.png')} style={{ height: normalize(size), width: normalize(size), resizeMode: 'contain', marginHorizontal: 10 }} />
        case ICONS.RIGHT_ARROW: return <Image source={require('../../../assets/icons/frame.png')} style={{ height: normalize(size), width: normalize(size), resizeMode: 'contain', marginHorizontal: 10 }} />
    }
}
