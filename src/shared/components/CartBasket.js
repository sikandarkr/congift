import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import AppIcon from './AppIcon';
import { ICONS } from '../../constants/icons';
import { COMMON_COLORS } from '../../constants/colors';
import { FONTS } from '../../constants/fonts';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withNavigation } from 'react-navigation';
import { normalize } from '../../utils/common.util';

class CartBasket extends React.Component {
    _renderCount = () => {
        const size = 16;
        const { cart } = this.props;
        if (cart.length <= 0) { return null; }
        return <View style={{
            height: size, width: size, borderRadius: size / 2, backgroundColor: COMMON_COLORS.SECONDARY,
            alignItems: 'center', justifyContent: 'center',
            position: 'absolute', top: 8, right: 15, elevation: 1
        }}>
            <Text style={{ color: COMMON_COLORS.WHITE, fontSize: normalize(12), fontFamily: FONTS.ROBOTO }}>{cart.length}</Text>
        </View>
    }
    render() {
        return (
            <TouchableOpacity onPress={() => this.props.navigation.navigate('Basket')} style={{ alignSelf: 'flex-end' }}>
                <View style={{ flex: 1, position: 'relative', paddingHorizontal: 10, justifyContent: 'center' }}>
                    {this._renderCount()}
                    <AppIcon name={ICONS.CART} size={20} />
                </View>
            </TouchableOpacity>
        );
    }
}
const mapStateToProps = state => ({
    cart: state.cart
})

export default compose(
    withNavigation,
    connect(mapStateToProps)
)(CartBasket);