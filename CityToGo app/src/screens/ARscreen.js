import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    AppRegistry,
} from "react-native";

import {
    ViroVRSceneNavigator,
    ViroARSceneNavigator,
} from 'react-viro';

var apiKey = "29D8811D-4B5A-4BE1-B17F-82EDDDCF3A73";

var arScenes = {
    'ARSimpleSample': require('../components/HelloWorldSceneAR'),
    'ARPortal': require('../components/PortalAR')

}

class ARscreen extends Component {
    render() {
        return (
            <ViroARSceneNavigator
                initialScene={{
                    scene: arScenes['ARPortal'],
                }}
                apiKey={apiKey} />
        );
    }
}
export default ARscreen;

