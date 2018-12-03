import React, { Component } from 'react';
import { Modal, Text, TouchableHighlight, View, Alert, Image, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements'
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import { bold } from 'ansi-colors';
var radio_props = [
  { label: 'True', value: 0 },
  { label: 'False', value: 1 }
];

class Quiz_popUp extends Component {

  state = {
    modalVisible: false,

  };

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
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

            <Text style={styles.textStyle}> Japan was part of the Allied Powers during World War I </Text>
            <RadioForm
              radio_props={radio_props}
              initial={0}
              onPress={(value) => { this.setState({ value: value }) }}
            />
              <Button
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