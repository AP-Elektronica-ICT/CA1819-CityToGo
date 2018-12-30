import React from "react";
import { createStackNavigator } from "react-navigation";

import Login from './Login';
import Home from './Home';
import Profile from './Profile';
import Camera from './Camera'
import Maps from './Maps'
import ListSubSessions from "./ListSubSessions";


const Root = createStackNavigator(
    {
        Login: {
            screen: Login,
            navigationOptions: {
                header: null
            }
        },
        Profile: {
            screen: Profile,
            navigationOptions:{
                title: 'Profiel'
            }
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
        },
        Map: {
            screen: Maps,
            navigationOptions: {
                header: null
            }
        },
        ListSubSessions: {
            screen: ListSubSessions,
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