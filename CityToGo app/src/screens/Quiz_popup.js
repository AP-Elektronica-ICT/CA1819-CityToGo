import React, { Component } from 'react';
import { Modal, Text, TouchableHighlight, View, Alert, Image, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements'
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import { bold } from 'ansi-colors';
var radio_props = [
  { label: 'True', value: 0 },
  { label: 'False', value: 1 }
];
var category_props = [
  { label: 'History', value: "23"},
  { label: 'Politics', value: "24" },
  { label: 'Geography', value: "22"},
  { label: 'Geography', value: "22"}, 
  { label: 'Science/Computers', value: "18"},
  { label: 'Sports', value: "21"},
  

];
var arrQuiz = [];

class Quiz_popUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrQuiz: [],
      modalVisible: false,
      question: "",
      answer: "",
      category: "",
      category_is_selected:false

    }

  }
  componentWillMount() {
   // this.QuizCategory();
    //this.setState({ category: "22" })
  }
  QuizCategory = async () => {
    fetch('http://192.168.1.60:3000/api/QuizCategory', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        category: this.state.category,

      })
    }).then((response) => response.json()).then((data) => {
      this.setState({
        question: data[0].question,
        answer: data[0].correct_answer
      })
    });
  }
  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }
  confirmCategory(){
    this.setState({category_is_selected:true})
    this.QuizCategory();
  }

  render() {
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
            <Text style={styles.textStyle}> {this.state.answer} </Text>
            <RadioForm
              radio_props={radio_props}
              initial={0}
              onPress={(value) => { this.setState({ value: value }) }}
            />
            <Button
              onPress={() => {
                this.QuizCategory();
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