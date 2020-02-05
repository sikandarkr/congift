import React from 'react';
import {
    Image
} from "react-native";
import { 
    createAppContainer, 
    createSwitchNavigator    
} from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import SplashScreen from '../screens/SplashScreen';
import TutorialScreen from '../screens/TutorialScreen';
import HomeScreen from '../screens/HomeScreen';
import VerifyNumber from '../screens/user/VerifyNumber';
import VerifyOTP from '../screens/user/VerifyOTP';
import SignIn from '../screens/user/SignIn';
import SignUp from '../screens/user/SignUp';

const noHeader = ({ navigation }) => ({
    header: null,
});

const HomeStack = createBottomTabNavigator({
    Gift: { screen: HomeScreen, navigationOptions: {
            tabBarIcon: ({ focused }) => {
                const image = focused
                    ? require('../../assets/activedot.png')
                    : require('../../assets/inactivedot.png')
                return (
                    <Image
                        source={image}
                        style={{ height: 20, width: 20 }}
                    />
                )
            },
            tabBarLabel: "Gift"
        }
    },
    Tease: { screen: HomeScreen, navigationOptions: {
        tabBarIcon: ({ focused }) => {
            const image = focused
                ? require('../../assets/activedot.png')
                : require('../../assets/inactivedot.png')
            return (
                <Image
                    source={image}
                    style={{ height: 20, width: 20 }}
                />
            )
        },
        tabBarLabel: "Tease"
      }
    }
});

const HomeDrawer = createDrawerNavigator(
    { Home: HomeStack, navigationOptions: noHeader }
);

const MainStack = createStackNavigator(
    {
        Main: { 
            screen:HomeDrawer
        },
        Tutorials: { 
            screen: TutorialScreen, 
            navigationOptions: noHeader 
        },
        VerifyNumber: { 
            screen: VerifyNumber, 
            navigationOptions: noHeader 
        },
        VerifyOTP: { 
            screen: VerifyOTP, 
            navigationOptions: noHeader 
        },
        SignIn: {
            screen: SignIn,
            navigationOptions: noHeader
        },
        SignUp: {
            screen: SignUp,
            navigationOptions: noHeader
        }
    },
    {
        initialRouteName: 'Tutorials',
        headerLayoutPreset: 'center',
        headerStyle: { elevation: 1 },
    }
);

const AppContainer = createAppContainer(
    createSwitchNavigator(
    {
        Splash: SplashScreen,
        App: MainStack
    }, 
    {
        initialRouteName: 'Splash',
    })
);

export default AppContainer;