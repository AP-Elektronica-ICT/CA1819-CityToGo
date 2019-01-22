import React, { Component } from 'react';

import { StyleSheet } from 'react-native';

import {
    ViroARScene,
    ViroText,
    ViroMaterials,
    ViroBox,
    Viro3DObject,
    ViroAmbientLight,
    ViroSpotLight,
    ViroARPlane,
    ViroARPlaneSelector,
    ViroQuad,
    ViroNode,
    ViroAnimations,
    ViroConstants,
    ViroSpinner
} from 'react-viro';

//Redux
import { getPoly } from '../redux/actions/polyAction'

import { connect } from "react-redux";

class ExplorerAR extends Component {

    constructor() {
        super();

        // Set initial state here
        this.state = {
            text: "Press to discover more",
            obj: '',
            texture: '',
        };

        // bind 'this' to functions
        this._onInitialized = this._onInitialized.bind(this);
    }

     componentDidMount() {
        let random = this.generateRandomint(1, 20);
     }

    generateRandomint(min, max) {
        return parseInt(Math.random() * (max - min) + min);
    }
    goToExplorer() {
        // this.props.sceneNavigator.jump('ExplorerAR',{ scene: ExplorerAR });
        this.props.getPoly()
    }

    // componentDidUpdate(prevProps) {
    //     const { fetched, fetching, poly } = this.props.polyState
    //     if (prevProps.polyState.fetched !== fetched) {
    //         let length = poly.assets.length
    //         let random = this.generateRandomint(1, length);
    //         console.log('random ' + random)
    //         // console.log(poly.assets[0].formats[0].root.url)
    //         // console.log(poly.assets[0].formats[0].resources[0].url)
    //         let obj = poly.assets[random].formats[0].root.url
    //         let texture = poly.assets[random].formats[0].resources[0].url
    //         this.setState({ obj: random, texture: texture })
    //         console.log(this.state.obj)
    //     }
    // }

    render() {
        const { fetched, fetching, poly } = this.props.polyState

        //console.log(poly.assets[0].formats[0].resources[0].url)
        if (fetching)
            return (
                <ViroARScene >
                    <ViroSpinner
                        type='light'
                        position={[0, 0.5, -4]}
                    />
                </ViroARScene>
            )
        if (fetched) {
            let length = poly.assets.length
            let random = this.generateRandomint(1, length);
            console.log('random ' + random)
            // console.log(poly.assets[0].formats[0].root.url)
            // console.log(poly.assets[0].formats[0].resources[0].url)
            let obj = poly.assets[random].formats[0].root.url
            let texture = poly.assets[random].formats[0].resources[0].url
            return (
                <ViroARScene onTrackingUpdated={this._onInitialized} >
                    {/* <ViroText text={this.state.text} scale={[.5, .5, .5]} position={[0, 0, -1]} style={styles.helloWorldTextStyle} />
                <ViroBox position={[0, -.5, -1]} scale={[.3, .3, .1]} materials={["grid"]} /> */}
                    <ViroAmbientLight color={"#aaaaaa"} />
                    <ViroSpotLight innerAngle={5} outerAngle={90} direction={[0, -1, -.2]}
                        position={[0, 3, 1]} color="#ffffff" castsShadow={true} />
                    <ViroNode position={[0, -1, 0]} dragType="FixedToWorld" onDrag={() => { }} >
                        <Viro3DObject
                            source={{ uri: obj }}
                            resources={[{ uri: texture }]}
                            position={[0, 0, -2]}
                            scale={[.2, .2, .2]}
                            type="OBJ" />
                    </ViroNode>
                </ViroARScene>
            );
        }
        return (
            <ViroARScene  >

                <ViroText
                    onClick={() => this.goToExplorer()}
                    text={this.state.text}
                    scale={[.5, .5, .5]}
                    position={[0, 0, -1]}
                />


            </ViroARScene>
        )
    }

    _onInitialized(state, reason) {
        if (state == ViroConstants.TRACKING_NORMAL) {
            this.setState({
                text: "Hello World!"
            });
        } else if (state == ViroConstants.TRACKING_NONE) {
            // Handle loss of tracking
        }
    }

}

var styles = StyleSheet.create({
    helloWorldTextStyle: {
        fontFamily: 'Arial',
        fontSize: 30,
        color: '#ffffff',
        textAlignVertical: 'center',
        textAlign: 'center',
    },
});

ViroMaterials.createMaterials({
    grid: {
        diffuseTexture: require('./res/grid_bg.jpg'),
    },
});


function mapStateToProps(state) {
    return {
        polyState: state.poly

    }
}

export default connect(mapStateToProps, {
    getPoly
})(ExplorerAR);
