import React from 'react';
import { View, Text } from 'react-native';

class SplashScreen extends React.Component {
    componentDidMount() {
        // When mounted, wait one second, then navigate to App
        setTimeout(() => {
          // Components that are placed inside a React Navigation
          // navigator will receive the `navigation` prop.
          // It's main usage is to trigger navigation events.
          // Right here we're telling it to navigate to the route
          // with the name 'App'.
          console.log("test splash screen");
          this.props.navigation.navigate('Tutorials');
        }, 3000);
      }
    render () {
        return (
            <View>
                <Text>Splash Screen</Text>
            </View>
        );
    }
}

export default SplashScreen;