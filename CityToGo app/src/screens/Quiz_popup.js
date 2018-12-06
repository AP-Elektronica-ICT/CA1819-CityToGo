import React, { Component } from 'react';
import { Modal, Text, TouchableHighlight, View, Alert, Image, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements'
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import { bold } from 'ansi-colors';
var radio_props = [
  { label: 'True', value: 0 },
  { label: 'False', value: 1 }
];
var arrQuiz=[];

class Quiz_popUp extends Component {
  constructor(props) {
    super(props);
    this.state= {
      arrQuiz: [],
      modalVisible: false,
      question: "",
      answer:""
      
    }
 
  }
componentWillMount(){
  this.getQuizes();
}
generateRandomint(min, max) {
  return Math.random() * (max - min) + min;
}

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }
   getQuizes = async () => {
    const response = await fetch('http://172.16.193.57:3000/api/quizes');
    const json = await response.json();
    // just log ‘json’
  
    this.setState({
      arrQuiz:json,
      question:json[0].question,
      question:json[0].correct_answer
    })
    console.log(this.state.arrQuiz[0].question);
}
  render() {

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
                          this.getQuizes();
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


export default Quiz_popUp;

const styles = StyleSheet.create({
  container:{
    flex:1,
    
    alignItems:'center',
    justifyContent:'center'
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
  textStyle:{
    textAlign:'center',
    fontWeight:'bold',
    fontSize:20,

  }
});