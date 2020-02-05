import React from 'react';
import { TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import { COMMON_COLORS } from '../../constants/colors';
import { compose } from 'redux';
import { withNavigation } from 'react-navigation';
import { COMMON_STYLES } from '../../constants/styles';

const SIcon = (props) => (
    <TouchableOpacity onPress={() => props.navigation.navigate('Search')}>
        <Ionicons name={'md-search'} style={[COMMON_STYLES.PRIMARY_COLOR, COMMON_STYLES.DEFAULT_TEXT_SIZE]} />
    </TouchableOpacity>
);
const SearchIcon = ({ useState, search, navigation }, props) => {
    if (useState) {
        if (!search) {
            return <SIcon navigation={navigation} />
        }
        return null;
    }
    return <SIcon navigation={navigation} />;
}
const mapStateToProps = state => ({
    search: state.search
});
export default compose(
    withNavigation,
    connect(mapStateToProps)
)(SearchIcon);