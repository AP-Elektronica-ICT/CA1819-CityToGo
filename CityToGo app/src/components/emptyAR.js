'use strict';

import React, { Component } from 'react';

import { StyleSheet } from 'react-native';

import {
    ViroARScene,
    ViroText
} from 'react-viro';

import ExplorerAR from "./ExplorerAR";



export default class emptyAR extends Component {

    constructor() {
        super();

        // Set initial state here
        this.state = {
            text: "Please go back"
        };

    }

    goToExplorer(){
        this.props.sceneNavigator.jump('ExplorerAR',{ scene: ExplorerAR });
    }

    render() {
        return (
            <ViroARScene  >

                <ViroText
                    onClick={() => this.goToExplorer()}
                    text={this.state.text}
                    scale={[.5, .5, .5]}
                    position={[0, 0, -1]}
            />


            </ViroARScene>
        );
    }

}


module.exports = emptyAR;