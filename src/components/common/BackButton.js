import React from 'react';
import { TouchableOpacity } from 'react-native';
import AppIcon from '../../shared/components/AppIcon';
import { ICONS } from '../../constants/icons';
import { withNavigation } from 'react-navigation';

function BackButton({ navigation, onBack, backEvent }, props) {
    //console.log(backEvent);
    return (<TouchableOpacity onPress={() => {
        if (!!backEvent) { onBack(); } else { navigation.goBack() }
    }}>
        <AppIcon name={ICONS.BACK} />
    </TouchableOpacity>
    );
}
export default withNavigation(BackButton);