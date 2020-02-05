import React from 'react';
import { TouchableOpacity } from 'react-native';
import AppIcon from '../../shared/components/AppIcon';
import { ICONS } from '../../constants/icons';
import { withNavigation } from 'react-navigation';
//import { storeLocation } from '../../store/actions/locationAction';
//import { CITY_NAME, CITY_CODE } from '../../constants/common';
import { compose } from 'redux';
import { connect } from 'react-redux';

function CloseButton({ navigation, storeLocation }, props) {
    return (<TouchableOpacity onPress={() => {
        //storeLocation({ name: CITY_NAME, code: CITY_CODE});
        navigation.navigate('Main');
        }
    }>
        <AppIcon name={ICONS.CLOSE} />
    </TouchableOpacity>
    );
}

const mapDispatchToProps = (dispatch) => ({
    storeLocation: (location) => dispatch(storeLocation(location))
});

export default compose(
    connect(null, mapDispatchToProps),
    withNavigation
)(CloseButton);