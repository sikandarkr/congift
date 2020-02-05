import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { COMMON_COLORS } from '../../constants/colors';
import { connect } from 'react-redux';
import { COMMON_STYLES } from '../../constants/styles';

class AppLoadingIndicator extends React.Component {
    render() {
        if (!this.props.loading) {
            if (this.props.children) { return this.props.children };
            return null;
        }

        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={[COMMON_STYLES.SMALL_TEXT_SIZE]}>Loading</Text>
                <ActivityIndicator color={this.props.color || COMMON_COLORS.PRIMARY} size="large" />
            </View>

        )
    }
}
const mapStateToProps = state => ({
    loading: state.loading
})
export default connect(mapStateToProps)(AppLoadingIndicator);