import React from 'react';
import { View, StyleSheet, ActivityIndicator, Text } from 'react-native';
import Modal from 'react-native-modal';
import { connect } from 'react-redux';
import { normalize } from '../../utils/common.util';
import { COMMON_COLORS } from '../../constants/colors';


class PopupLoader extends React.Component {
    state = { hasLoaded: false };
    componentDidMount() {
        this.setState({ hasLoaded: true });
    }
    render() {
        return (
            <Modal isVisible={this.state.hasLoaded && this.props.isLoading}>
                <View style={styles.content}>
                    <ActivityIndicator size={'large'} color={COMMON_COLORS.PRIMARY} />
                    <Text style={{ fontSize: normalize(14) }}>Loading</Text>
                </View>
            </Modal>
        );
    }
}
const mapStateToProps = state => ({ isLoading: state.loading });
export default connect(mapStateToProps)(PopupLoader);
const styles = StyleSheet.create({
    content: {
        backgroundColor: 'white',
        paddingVertical: normalize(20),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        borderColor: 'rgba(0, 0, 0, 0.1)',
    }
});
