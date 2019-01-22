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
  ViroConstants,
  ViroButton,
  ViroSpinner
} from 'react-viro';

import { getQuiz } from "../redux/actions/quizAction";
import { monument } from '../redux/actions/monumentAction'
import { connect } from "react-redux";

import emptyAR from "./emptyAR";
import ExplorerAR from "./ExplorerAR";


var random;

class QuizAR extends Component {

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
      showQuestion: false
    }

  }

  componentDidMount() {

  }

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

  checkAnswer(answer) {
    //  const { navigate } = this.props.navigation;
    // const { navigate } = this.props.navigation;
    console.log('correct anwer is: ' + this.state.answer)
    if (answer == this.state.answer) {
      console.log("Correct Answer bro !")
      this.setState({
        question: 'Correct!'
      })
      // this.setState({ category_is_selected: false, modalVisible: false })
      setInterval(() => {
        this.setState({showQuestion: false})
        this.props.sceneNavigator.jump('ExplorerAR',{ scene: ExplorerAR });
      }, 3000);
    }
    else {
      console.log("Wrong answer bro !")
      this.setState({
        question: 'Wrong'
      })
      // this.setState({ category_is_selected: false, modalVisible: false })
      setInterval(() => {
        this.setState({showQuestion: false})
        this.props.sceneNavigator.jump('ExplorerAR',{ scene: emptyAR });
        
      }, 3000);
    }
  }

  getQuestions(quizzes) {
    let length = quizzes.length
    random = this.generateRandomint(1, length);
    this.setState({
      question: quizzes[parseInt(random)].question,
      answer: quizzes[parseInt(random)].correct_answer
    })
  }

  getQuiz(categoryNummer, numOfquistions) {
    this.props.getQuiz(categoryNummer, numOfquistions)
    console.log(this.props.quiz)

  }

  componentDidUpdate(prevProps) {
    const { fetched, quiz } = this.props.quiz
    if (prevProps.quiz.fetched !== fetched) {
      this.getQuestions(quiz)
      this.setState({
        showQuestion: fetched
      })
    }
  }



  _onHoveringCategory = (isHovering, categoryName) => {

    if (isHovering) {

      switch (categoryName) {
        case 'POLITICS':
          this.setState({
            opacityPolitics: 0.5,
            isClickablePolitics: true
          });
          break;
        case 'GEOGRAPHY':
          this.setState({
            opacityGeography: 0.5,
            isClickableGeography: true
          });
          break;
        case 'HISTORY':
          this.setState({
            opacityHistory: 0.5,
            isClickableHistory: true
          });
          break;
        case 'SCIENCE&COMPUTER':
          this.setState({
            opacityScienceCumputer: 0.5,
            isClickableScienceCumputer: true
          });
          break;
        case 'SPORTS':
          this.setState({
            opacitySports: 0.5,
            isClickableSports: true
          });
          break;
        case 'TRUE':
          this.setState({
            opacityTrue: 0.5,
            isClickableTrue: true
          });
          break;
        case 'FALSE':
          this.setState({
            opacityFalse: 0.5,
            isClickableFalse: true
          });
          break;


        default:
          break;
      }

    }


    else
      this.setState({
        opacityPolitics: 1,
        isClickablePolitics: false,
        opacityGeography: 1,
        isClickableGeography: false,
        opacityHistory: 1,
        isClickableHistory: false,
        opacityScienceCumputer: 1,
        isClickableScienceCumputer: false,
        opacitySports: 1,
        isClickableSports: false,
        opacityTrue: 1,
        isClickableTrue: false,
        opacityFalse: 1,
        isClickableFalse: false


      });
  }

  render() {
    const { fetched, fetching } = this.props.quiz



    if (fetching)
      return (
        <ViroARScene >
          <ViroSpinner
            type='light'
            position={[0, 0.5, -4]}
          />
        </ViroARScene>
      )


    if (this.state.showQuestion) {
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
            onClick={() => {
              if (this.state.isClickableTrue)
                this.checkAnswer('True')
            }}
            height={1}
            width={1}
            position={[-1.2, -0.5, -4]}
            source={require("../assets/quiz_category_icons/true_icon.png")}
            onHover={(isHovering) => this._onHoveringCategory(isHovering, 'TRUE')}
            opacity={this.state.opacityTrue}
          />

          <ViroImage
            onClick={() => {
              if (this.state.isClickableFalse)
                this.checkAnswer('False')
            }}
            height={1}
            width={1}
            position={[1.2, -0.5, -4]}
            source={require("../assets/quiz_category_icons/false_icon.png")}
            onHover={(isHovering) => this._onHoveringCategory(isHovering, 'FALSE')}
            opacity={this.state.opacityFalse}
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
              if (this.state.isClickablePolitics)
                this.getQuiz(24, 17)
            }}
            onHover={(isHovering) => this._onHoveringCategory(isHovering, 'POLITICS')}
            height={1}
            width={1}
            position={[-2.4, 0, -4]}
            source={require("../assets/quiz_category_icons/politics_icon.png")}
            opacity={this.state.opacityPolitics}
          />

          <ViroText
            text='Politics'
            // height={1} 
            // width={4} 
            position={[-2.4, -0.7, -4]}
            style={styles.textStyle}
          />

          <ViroImage
            onClick={() => {
              if (this.state.isClickableGeography)
                this.getQuiz(22, 37)
            }}
            onHover={(isHovering) => this._onHoveringCategory(isHovering, 'GEOGRAPHY')}
            height={1}
            width={1}
            position={[-1.2, 0, -4]}
            source={require("../assets/quiz_category_icons/geography_icon.png")}
            opacity={this.state.opacityGeography}
          />

          <ViroText
            text='Geography'
            // height={1} 
            // width={4} 
            position={[-1.2, -0.7, -4]}
            style={styles.textStyle}
          />

          <ViroImage
            onClick={() => {
              if (this.state.isClickableHistory)
                this.getQuiz(23, 39)
            }}
            onHover={(isHovering) => this._onHoveringCategory(isHovering, 'HISTORY')}
            height={1}
            width={1}
            position={[0, 0, -4]}
            source={require("../assets/quiz_category_icons/history_icon.png")}
            opacity={this.state.opacityHistory}
          />
          <ViroText
            text='History'
            // height={1} 
            // width={4} 
            position={[0, -0.7, -4]}
            style={styles.textStyle}
          />

          <ViroImage
            onClick={() => {
              if (this.state.isClickableScienceCumputer)
                this.getQuiz(18, 32)
            }}
            onHover={(isHovering) => this._onHoveringCategory(isHovering, 'SCIENCE&COMPUTER')}
            height={1}
            width={1}
            position={[1.2, 0, -4]}
            source={require("../assets/quiz_category_icons/science_computer_icon.png")}
            opacity={this.state.opacityScienceCumputer}
          />

          <ViroText
            text='Science and technology'
            // height={1} 
            // width={4} 
            position={[1.2, -1, -4]}
            style={styles.textStyle}
          />

          <ViroImage
            onClick={() => {
              if (this.state.isClickableSports)
                this.getQuiz(21, 11)
            }}
            onHover={(isHovering) => this._onHoveringCategory(isHovering, 'SPORTS')}
            height={1}
            width={1}
            position={[2.4, 0, -4]}
            source={require("../assets/quiz_category_icons/sports_icon.png")}
            opacity={this.state.opacitySports}
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

function mapStateToProps(state) {
  return {
    quiz: state.quiz

  }
}

export default connect(mapStateToProps, {
  getQuiz,
  monument
})(QuizAR)
