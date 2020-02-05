import React from 'react';
import AppIcon from './AppIcon';
import { TouchableOpacity } from 'react-native';
import { ICONS } from '../../constants/icons';
import { withNavigation } from 'react-navigation';
const MenuButton = ({ navigation }, props) => {
    return (
        <TouchableOpacity
            onPress={() => navigation.toggleDrawer()}>
            <AppIcon name={ICONS.MENU} />
        </TouchableOpacity>
    )
}
export default withNavigation(MenuButton);