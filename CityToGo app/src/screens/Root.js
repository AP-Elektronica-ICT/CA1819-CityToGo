import React from "react";
import { createStackNavigator } from "react-navigation";

import Login from './Login';
import Home from './Home';
import Profile from './Profile';


const Root = createStackNavigator(
    {
        Login: {
            screen: Login,
            navigationOptions: {
                header: null
            }
        },
        Profile: {
            screen: Profile
        },
        Home: {
            screen: Home,
            navigationOptions: {
                header: null
            }
        }
    },
    {
        initialRouteName: "Login" // show the login screen by default
    }
);

export default Root;