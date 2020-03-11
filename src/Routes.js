import React from "react";

import loginScreen from './screens/Authentication/login';
import welcomeScreen from "./screens/welcome";
import CreateAccount from "./screens/Authentication/createAccount";
import ridesList from "./screens/rides/ridesList"
import { createAppContainer } from 'react-navigation';
import AnimatedMarkers from "./screens/rides/map"
// import StaticWebView from "./screens/staticWebView";
import { createStackNavigator } from 'react-navigation-stack';
import AuthenticationContainer from "./containers/AuthenticationContainer"
import ForgotPassword from "./screens/Authentication/forgotPassword";
import webView from "./screens/webView";
const AppNavigator = createStackNavigator({
    Home: {
        screen: AuthenticationContainer(welcomeScreen),
    },
    createAccount: {
        screen: AuthenticationContainer(CreateAccount)
    },
    Login: {
        screen: AuthenticationContainer(loginScreen)
    },
    Map: {
        screen: AuthenticationContainer(AnimatedMarkers)
    },
    rides: {
        screen: AuthenticationContainer(ridesList)
    },

    WebView: {
        screen: AuthenticationContainer(webView)
    },
    forgotPaassword: {
        screen: AuthenticationContainer(ForgotPassword)
    }

});
const AppContainer = createAppContainer(AppNavigator);


export default AppContainer;