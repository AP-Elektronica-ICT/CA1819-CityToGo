import React, { Component } from 'react';
import { Modal, Text, TouchableHighlight, View, Alert, Image, StyleSheet } from 'react-native';
import { Button } from "./../common"
class ModalExample extends Component {
  state = {
    modalVisible: false,
    showButton: true
  };

  setModalVisible(visible, btnvisible) {
    this.setState({ modalVisible: visible })
    this.setState({ showButton: btnvisible })
  }

  startGameSession() {
    this.setModalVisible(false);
    if (this.state.showButton == true) {
      this.props.startGameSession()
    }
  }

  render() {

    return (
      <View style={styles.container}>
        <Modal
          transparent={true}
          animationType="fade"
          visible={this.state.modalVisible}
          onRequestClose={() => { Alert.alert('Modal has been closed.'); }}
        >


           <View style={styles.Model}>
          <View style={styles.background}>
          <View></View>
            <Image style={styles.image}    source={{ uri: `${this.props.imageUri}` }}/>
            {/* blurRadius={this.props.blur} */}
            <Text style={styles.Text} > {this.props.data}</Text>
         
            < Button onPress={() => { this.startGameSession() }} >LET'S GO</Button>
          
          </View>
          </View>

        </Modal>


      </View>
    );
  }
}


export default ModalExample;

const styles = StyleSheet.create({
  image: {
   // flex:1,
    marginTop: 20,
    height:300,
    borderRadius: 15,
    width: 220
  },
  
  Model:{
    flexDirection:'row',
    flex:1,
   //backgroundColor: 'black',
   backgroundColor : 'rgba(255,255,255,0.5)',
     justifyContent: 'center',
     alignItems: 'center',
     
  },
  background: {
    position: 'absolute',
    backgroundColor: '#2A2E43',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:60,
    marginBottom:60,
    marginRight:50,
    marginLeft:50,
    borderRadius: 20,
    paddingTop:10,
    paddingBottom:20,
    width:350,
    padding:10

  },
  Text:{
    alignSelf: 'center',
    color: 'rgba(255,255,255, 0.68);',
    paddingTop: 20,
    paddingBottom: 20,
    paddingRight:25,
    paddingLeft:25
},
});