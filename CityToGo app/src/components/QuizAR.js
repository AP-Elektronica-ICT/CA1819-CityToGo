'use strict';

import React, { Component } from 'react';

import {
  StyleSheet
} from 'react-native';
import Config from '../config/config'

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

var random;

export default class QuizAR extends Component {

  constructor(props) {
    super(props);
    this.state = {
      arrQuiz: [],
      modalVisible: false,
      question: "",
      answer: "",
      given_answer: "",
      category: "",
      category_is_selected: false,
      opacity: 1,
      isClickable: false


    }

  }

  // state = {
  //   opacity: 1,
  //   isClickable: false
  // }

  generateRandomint(min, max) {
    return Math.random() * (max - min) + min;
  }

  QuizCategory = async () => {
    fetch(`http://${Config.MY_IP_ADRES}:3000/api/QuizCategory`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        category: this.state.category,

      })
    }).then((response) => response.json()).then((data) => {
      random = this.generateRandomint(1, 9);
      this.setState({
        question: data[parseInt(random)].question,
        answer: data[parseInt(random)].correct_answer
      })

      console.log(data[parseInt(random)].question)
    });
  }

  confirmCategory() {
    this.setState({ category_is_selected: true })
    this.QuizCategory();
  }

  checkAnswer() {
    if (this.state.given_answer == this.state.answer) {
      console.log("Correct Answer bro !")
      this.setState({ category_is_selected: false, modalVisible: false })
    }
    else {
      console.log("Wrong answer bro !")
      this.setState({ category_is_selected: false, modalVisible: false })
    }
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

    if (this.state.category_is_selected) {
      return (

        <ViroARScene >
          {/* <ViroAmbientLight color={"#aaaaaa"} />
          <ViroSpotLight innerAngle={5} outerAngle={90} direction={[0, -1, -.2]} position={[0, 3, 1]} color="#ffffff" castsShadow={true} /> */}
          <ViroText
            text={this.state.question}
            height={1}
            width={4}
            position={[0, 0.5, -4]}
            style={styles.textStyle}
          />

          <ViroImage
            height={1}
            width={1}
            position={[-1.2, -0.5, -4]}
            source={require("../assets/quiz_category_icons/true_icon.png")}
          />

          <ViroImage
            height={1}
            width={1}
            position={[1.2, -0.5, -4]}
            source={require("../assets/quiz_category_icons/false_icon.png")}
          />

        </ViroARScene>
      );
    }
    else {


      return (


        <ViroARScene >
          {/* <ViroAmbientLight color={"#aaaaaa"} />
          <ViroSpotLight innerAngle={5} outerAngle={90} direction={[0, -1, -.2]} position={[0, 3, 1]} color="#ffffff" castsShadow={true} /> */}

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
              this.setState({ category: '24' })
              this.confirmCategory();
            }}
            onHover={(isHovering) => this.onHoveringCategory(isHovering)}
            height={1}
            width={1}
            position={[-2.4, 0, -4]}
            source={require("../assets/quiz_category_icons/politics_icon.png")}
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
            source={require("../assets/quiz_category_icons/geography_icon.png")}
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
            source={require("../assets/quiz_category_icons/history_icon.png")}
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
            source={require("../assets/quiz_category_icons/science_computer_icon.png")}
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
            source={require("../assets/quiz_category_icons/sports_icon.png")}
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