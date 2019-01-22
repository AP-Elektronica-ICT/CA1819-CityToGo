import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
} from "react-native";

import QuizAR from "../components/QuizAR";
import PortalAR from "../components/PortalAR";
import ExplorerAR from "../components/ExplorerAR";
import emptyAR from '../components/emptyAR'

import {
    ViroARSceneNavigator,
} from 'react-viro';

var apiKey = "29D8811D-4B5A-4BE1-B17F-82EDDDCF3A73";

var arScenes = {
    'ARQuiz': QuizAR,
    'ARPortal': PortalAR,
    'ExplorerAR': ExplorerAR,
    'emptyAR': emptyAR
}

class ARscreen extends Component {
    render() {
        const ARSceneName = this.props.navigation.getParam('ARSceneName');
        //const ARSceneName = 'ARPortal'
        switch (ARSceneName) {
            case 'ARQuiz':
                return (
                    <View
                        style={styles.container}
                    >
                        <ViroARSceneNavigator

                            initialScene={{
                                scene: arScenes['ARQuiz'],
                            }}
                            apiKey={apiKey} />
                        <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'red' }}>⊙</Text>
                        </View>
                    </View>
                );

            case 'ARPortal':

                return (
                    <ViroARSceneNavigator
                        initialScene={{
                            scene: arScenes['ARPortal'],
                        }}
                        apiKey={apiKey} />
                )
            case 'ExplorerAR':

                return (
                    <ViroARSceneNavigator
                        initialScene={{
                            scene: arScenes['ExplorerAR'],
                        }}
                        apiKey={apiKey} />
                )
            case 'emptyAR':

                return (
                    <ViroARSceneNavigator
                        initialScene={{
                            scene: arScenes['emptyAR'],
                        }}
                        apiKey={apiKey} />
                )

            default:

                break;
        }
    }
}
export default ARscreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});

