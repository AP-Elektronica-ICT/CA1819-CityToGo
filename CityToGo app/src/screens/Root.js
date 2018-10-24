import React from "react";
import { createStackNavigator } from "react-navigation";

import Login from './Login';
import Home from './Home'


const Root = createStackNavigator(
    {
        Login: {
            screen: Login,
            navigationOptions: {
                header: null
            }
        },
        Home: {
            screen: Home,
            navigationOptions: {
                header: null
            }
        }
    },
    {
        initialRouteName: "Home" // show the login screen by default
    }
);

export default Root;