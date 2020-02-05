import React from 'react';
import PopupLoader from '../shared/components/PopupLoader';
import hoistNonReactStatics from 'hoist-non-react-statics';

const withLoader = (WrappedComponent) => {
    class WithLoadingScreen extends React.Component {
        render() {
            return (
                <React.Fragment>
                    <PopupLoader />
                    <WrappedComponent {...this.props} />
                </React.Fragment>
            );
        }
    }
    hoistNonReactStatics(WithLoadingScreen, WrappedComponent);
    return WithLoadingScreen
}
export default withLoader;