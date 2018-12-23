'use strict';

import React, { Component } from 'react';

import {
  StyleSheet
} from 'react-native';

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
  ViroImage,
  ViroARCamera,
  ViroScene,
  ViroConstants
} from 'react-viro';

export default class QuizAR extends Component {

  

   state = {
     opacity: 1,
     isClickable: false
   }



  onHoveringCategory = (isHovering) => {
    if (isHovering)
      this.setState({
        opacity: 0.5,
        isClickable: true
      });

    else
      this.setState({
        opacity: 1,
        isClickable: false
      });
  }

  render() {
    return (


        <ViroARScene >
          <ViroAmbientLight color={"#aaaaaa"} />
          <ViroSpotLight innerAngle={5} outerAngle={90} direction={[0, -1, -.2]} position={[0, 3, 1]} color="#ffffff" castsShadow={true} />

          <ViroText
            text='Please choose one category'
            height={1}
            width={4}
            position={[0, 1, -4]}
            style={styles.textStyle}
          />

          <ViroImage
            onClick={() => {
              if (this.state.isClickable)
                console.log('politic clicked')
            }}
            onHover={(isHovering) => this.onHoveringCategory(isHovering)}
            height={1}
            width={1}
            position={[-2.4, 0, -4]}
            source={require("../assets/category_icons/politics_icon.png")}
            opacity={this.state.opacity}
          />

          <ViroText
            onHover={(isHovering) => this.onHoveringCategory(isHovering)}
            text='Politics'
            // height={1} 
            // width={4} 
            position={[-2.4, -0.7, -4]}
            style={styles.textStyle}
          />

          <ViroImage
            height={1}
            width={1}
            position={[-1.2, 0, -4]}
            source={require("../assets/category_icons/geography_icon.png")}
          />

          <ViroText
            text='Geography'
            // height={1} 
            // width={4} 
            position={[-1.2, -0.7, -4]}
            style={styles.textStyle}
          />

          <ViroImage
            height={1}
            width={1}
            position={[0, 0, -4]}
            source={require("../assets/category_icons/history_icon.png")}
          />
          <ViroText
            text='History'
            // height={1} 
            // width={4} 
            position={[0, -0.7, -4]}
            style={styles.textStyle}
          />

          <ViroImage
            height={1}
            width={1}
            position={[1.2, 0, -4]}
            source={require("../assets/category_icons/science_computer_icon.png")}
          />

          <ViroText
            text='Science and technology'
            // height={1} 
            // width={4} 
            position={[1.2, -1, -4]}
            style={styles.textStyle}
          />

          <ViroImage
            height={1}
            width={1}
            position={[2.4, 0, -4]}
            source={require("../assets/category_icons/sports_icon.png")}
          />
          <ViroText
            text='Sports'
            // height={1} 
            // width={4} 
            position={[2.4, -0.7, -4]}
            style={styles.textStyle}
          />
        </ViroARScene>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1
  },
  textStyle: {
    fontFamily: 'Arial',
    fontSize: 20,
    color: '#ffffff',
    textAlignVertical: 'center',
    textAlign: 'center',
  },
  textCountDownStyle: {
    fontFamily: 'Arial',
    fontSize: 50,
    color: 'red',
    //textAlignVertical: 'center',
    textAlign: 'center',

  }
});

module.exports = QuizAR;