import React, { Component } from 'react';
import { Modal, Text, TouchableHighlight, View, Alert, Image, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements'
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import { bold } from 'ansi-colors';
import Config from '../config/config'

var radio_props = [
  { label: 'True', value: "True" },
  { label: 'False', value: "False"}
];
var category_props = [
  { label: 'History', value: "23"},
  { label: 'Politics', value: "24" },
  { label: 'Geography', value: "22"}, 
  { label: 'Science/Computers', value: "18"},
  { label: 'Sports', value: "21"},
  
];
var random;

class Quiz_popUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrQuiz: [],
      modalVisible: false,
      question: "",
      answer: "",
      given_answer:"",
      category: "",
      category_is_selected:false,


    }

  }
  generateRandomint(min, max) {
    return Math.random() * (max - min) + min;
}
  //Hier wordt category gepost en in response krijgen wij de vragen en de juiste antwoord!
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
      random=this.generateRandomint(0,10);
      this.setState({
        question: data[parseInt(random)].question,
        answer: data[parseInt(random)].correct_answer
      })
    });
  }
  //close button
  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }
  // Category bevestigen en vragen van de category laden
  confirmCategory(){
    this.setState({category_is_selected:true})
    this.QuizCategory();
  }
  //Het antwoord wordt hier gecontroleerd en rewards moet ook hier gegeven worden
  checkAnswer(){
    if(this.state.given_answer==this.state.answer){
    console.log("Correct Answer bro !")
    this.setState({category_is_selected:false,modalVisible:false})
  }
  else{
    console.log("Wrong answer bro !")
    this.setState({category_is_selected:false,modalVisible:false})
  }
  }
  render() {
    // Vragen renderen na bevestigen van category
   if(this.state.category_is_selected){
    return (
      <View style={styles.container}>
        <Modal

          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}>
          <View style={styles.container}>

            <Text style={styles.textStyle}>{this.state.question} </Text>
            <RadioForm
              radio_props={radio_props}
              initial={0}
              onPress={(value) => { this.setState({ given_answer: value }) }}
            />
            <Button
              onPress={() => {
                this.checkAnswer();
              }}

              buttonStyle={styles.buttonStyle}
              title="Confirm"
            />

            < Button buttonStyle={styles.buttonStyle2}
              onPress={() => {
                this.setModalVisible(false);
              }}

              title="close"
            />



          </View>

        </Modal>


      </View>
    );
  }
  else{
    return (
      <View style={styles.container}>
        <Modal

          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}>
          <View style={styles.container}>

            <Text style={styles.textStyle}>Select a category ! </Text>
            <RadioForm
              radio_props={category_props}
              initial={0}
              onPress={(value) => { this.setState({ category: value }) }}
            />
            <Button
              onPress={() => {
                this.confirmCategory();
              }}

              buttonStyle={styles.buttonStyle}
              title="Confirm"
            />

            < Button buttonStyle={styles.buttonStyle2}
              onPress={() => {
                this.setModalVisible(false);
              }}

              title="close"
            />



          </View>

        </Modal>


      </View>
    );

  }
}

}


export default Quiz_popUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,

    alignItems: 'center',
    justifyContent: 'center'
  },
  image: {
    marginTop: 20,
    marginLeft: 90,
    height: 200,
    width: 200
  },
  buttonStyle: {
    backgroundColor: "rgb(50,205,50)",
    width: 200,
    height: 45,
    borderColor: "transparent",
    borderWidth: 0,
    borderRadius: 5
  },
  buttonStyle2: {
    backgroundColor: "rgb(178,34,34)",
    width: 200,
    height: 45,
    borderColor: "transparent",
    borderWidth: 0,
    borderRadius: 5
  },
  textStyle: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,

  }
});