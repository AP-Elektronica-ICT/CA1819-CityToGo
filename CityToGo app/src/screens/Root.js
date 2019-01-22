import React from "react";
import { createStackNavigator } from "react-navigation";

import Login from './Login';
import Home from './Home';
import Profile from './Profile';
import Camera from './Camera'
import Maps from './Maps'
import LearnMore from './LearnMore'
import ListSubSessions from "./ListSubSessions";
import ARscreen from './ARscreen'
import QuizAR from "../components/QuizAR";


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
                title: 'Profiel',header: null 
            }
        },
        LearnMore:{
            screen:LearnMore,
            navigationOptions:{
                title: 'LearnMore',header: null 
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
        },
        ARclass: {
            screen: ARscreen,
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