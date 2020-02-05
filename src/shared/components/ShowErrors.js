import React from 'react';
import PropTypes from 'prop-types';
import { checkErrors } from '../../core/validation-service';
import ErrorText from './ErrorText';
import { View } from 'react-native';

class ShowErrors extends React.Component {

    static propTypes = {
        value: PropTypes.any,
        validations: PropTypes.object,
        display: PropTypes.bool,
    };

    static defaultProps = {
        display: false
    };

    listOfErrors() {
        const { validations, value } = this.props;
        const errors = checkErrors(value, validations);
        //this.props.notify(errors.length);
        return errors;
    }

    render() {
        if (!this.props.display) { return null; }
        return (
            <View>
                {this.listOfErrors().map(
                    err => <ErrorText key={err}>{err}</ErrorText>
                )}
            </View>
        );
    }
}
export default ShowErrors;