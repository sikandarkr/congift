import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { COMMON_COLORS } from '../../constants/colors';

class Loader extends React.Component {
    render() {
        if (!this.props.loading) {
            return null;
        }

        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>Loading</Text>
                <ActivityIndicator color={this.props.color || COMMON_COLORS.PRIMARY} size="large" />
            </View>

        )
    }
}

export default Loader;