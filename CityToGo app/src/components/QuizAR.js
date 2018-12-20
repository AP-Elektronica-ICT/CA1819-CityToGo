'use strict';

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
  ViroARPlaneSelector,
  ViroNode,
  ViroAnimations,
  ViroImage
} from 'react-viro';

export default class QuizAR extends Component {

  constructor() {
    super();

    // Set initial state here
    this.state = {
      text: "Initializing AR..."
    };

    // bind 'this' to functions
    this._onInitialized = this._onInitialized.bind(this);
  }



  render() {
    return (
      <ViroARScene onTrackingInitialized={() => { this.setState({ text: "Hello World!" }) }}>
        {/* <ViroText text={this.state.text} scale={[.1, .1, .1]} height={1} width={4} position={[0, 0, -1]} style={styles.helloWorldTextStyle} />  */}

        <ViroAmbientLight color={"#aaaaaa"} />
        <ViroSpotLight innerAngle={5} outerAngle={90} direction={[0, -1, -.2]} position={[0, 3, 1]} color="#ffffff" castsShadow={true} />

        <ViroImage
          height={1}
          width={1}
          position={[-2.4, 0, -4]}
          //placeholderSource={require("./res/local_spinner.jpg")}
          source={require("../assets/category_icons/politics_icon.png")}
        />
        <ViroText
          text='Politics'
          // height={1} 
          // width={4} 
          position={[-2.4, -0.7, -4]}
          style={styles.helloWorldTextStyle}
        />

        <ViroImage
          height={1}
          width={1}
          position={[-1.2, 0, -4]}
          //placeholderSource={require("./res/local_spinner.jpg")}
          source={require("../assets/category_icons/geography_icon.png")}
        />

        <ViroText
          text='Geography'
          // height={1} 
          // width={4} 
          position={[-1.2, -0.7, -4]}
          style={styles.helloWorldTextStyle}
        />

        <ViroImage
          height={1}
          width={1}
          position={[0, 0, -4]}
          //placeholderSource={require("./res/local_spinner.jpg")}
          source={require("../assets/category_icons/history_icon.png")}
        />
        <ViroText
          text='History'
          // height={1} 
          // width={4} 
          position={[0, -0.7, -4]}
          style={styles.helloWorldTextStyle}
        />

        <ViroImage
          height={1}
          width={1}
          position={[1.2, 0, -4]}
          //placeholderSource={require("./res/local_spinner.jpg")}
          source={require("../assets/category_icons/science_computer_icon.png")}
        />

        <ViroText
          text='Science and technology'
          // height={1} 
          // width={4} 
          position={[1.2, -1, -4]}
          style={styles.helloWorldTextStyle}
        />

        <ViroImage
          height={1}
          width={1}
          position={[2.4, 0, -4]}
          //placeholderSource={require("./res/local_spinner.jpg")}
          source={require("../assets/category_icons/sports_icon.png")}
        />
        <ViroText
          text='Sports'
          // height={1} 
          // width={4} 
          position={[2.4, -0.7, -4]}
          style={styles.helloWorldTextStyle}
        />



      </ViroARScene>
    );
  }

  _onInitialized(state, reason) {
    if (state == ViroConstants.TRACKING_NORMAL) {
      this.setState({
        text: "AR is gelukt!"
      });
    } else if (state == ViroConstants.TRACKING_NONE) {
      // Handle loss of tracking
    }
  }
}

var styles = StyleSheet.create({
  helloWorldTextStyle: {
    fontFamily: 'Arial',
    fontSize: 20,
    color: '#ffffff',
    textAlignVertical: 'center',
    textAlign: 'center',
  },
});

module.exports = QuizAR;