import React from "react";
import { createStackNavigator } from "react-navigation";

import Login from './Login';
import Home from './Home';
import Profile from './Profile';
import Camera from './Camera'


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
        },
        Camera: {
            screen: Camera,
            navigationOptions: {
                header: null
            }
        }
    },
    {
        initialRouteName: "Camera" // show the login screen by default
    }
);

export default Root;