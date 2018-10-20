import React from "react";
import { StackNavigator } from "react-navigation";

import uniLogin from './uniLogin';
import MainScreen from './MainScreen'


const Stack = StackNavigator(
    {
        Login: {
            screen: uniLogin
        },
        MainScreen: {
            screen: MainScreen
        }
    },
    {
        initialRouteName: "Login" // show the login screen by default
    }
);

export default Stack;