import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { getHeaderHeight } from '../../utils/ui.util';
import { COMMON_STYLES } from '../../constants/styles';
//import Constants from 'expo-constants';
import BackButton from './BackButton';
import CartBasket from '../../shared/components/CartBasket';
import CloseButton from './CloseButton';
import { normalize } from '../../utils/common.util';

function Header({ noBorder, noBack, title, cart, menu, closeIcon, onBack, backEvent, renderHeader, skip, navigation, skipNavigation, cancelLabel }, props) {
    return (
        <View style={[{ height: getHeaderHeight() }, noBorder ? null : COMMON_STYLES.BOTTOM_BORDER]}>
            <View style={[COMMON_STYLES.ROW_FLEX, COMMON_STYLES.FLEX_CENTER]}>
                <View style={{ flex: 0.25 }}>
                    {!noBack ? <BackButton onBack={() => onBack()} backEvent={backEvent} /> : null}
                    {closeIcon ? <CloseButton /> : null}
                    {/*{menu ? <MenuButton /> : null}*/}
                </View>
                <View style={{ flex:(skip) ? 1.25 : 1.75, left:normalize(0), justifyContent:'flex-start'}}>
                    {renderHeader ? renderHeader() : null}
                    {title ? <Text numberOfLines={1} style={[COMMON_STYLES.TITLE_TEXT_SIZE, COMMON_STYLES.FONT_POPPINSREGULAR,{textAlign:'left', color:'#666666'}]}>{title}</Text> : null}
                </View>
                <View style={{ flex: 0.25}}>
                    {cart ? <CartBasket /> : null}
                </View>
                {
                    skip ?
                        <View style={{ flex: (cancelLabel) ? 0.75 : 0.50}}>
                            <TouchableOpacity onPress={() => skipNavigation()} style={{ alignSelf: 'flex-end' }}>
                                <Text style={[COMMON_STYLES.FONT_POPPINSREGULAR, COMMON_STYLES.SMALL_TITLE_TEXT_SIZE, COMMON_STYLES.HORIZONTAL_MARGIN, COMMON_STYLES.VERTICAL_MARGIN, COMMON_STYLES.PRIMARY_COLOR]}>{(cancelLabel) ? 'Cancel' : 'Skip'}</Text>
                            </TouchableOpacity>                        
                        </View>
                    : null
                }
            </View>
        </View>
    )
}
export default Header;