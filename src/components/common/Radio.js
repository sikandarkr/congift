import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { COMMON_STYLES } from '../../constants/styles';
import { normalize } from '../../utils/common.util';

function Radio(props) {
    return (
        <React.Fragment>
            {
                props.selected ?
                    <Ionicons name='md-radio-button-on' style={[COMMON_STYLES.PRIMARY_COLOR, { fontSize: normalize(20) }]} /> :
                    <Ionicons name='md-radio-button-off' style={[COMMON_STYLES.DEFAULT_TEXT_SIZE, { fontSize: normalize(20) }]} />
            }
        </React.Fragment>
    )
}
export default Radio;