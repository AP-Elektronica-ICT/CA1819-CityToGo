import React, {Component} from 'react';
import {Modal, Text, TouchableHighlight, View, Alert,Image,StyleSheet} from 'react-native';
import { Button } from 'react-native-elements'
class ModalExample extends Component {
  state = {
    modalVisible: false,
  };

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  render() {
    debugger
    return (
      <View style={{marginTop: 22}}>
        <Modal
        
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}>
          <View style={{marginTop: 22}}>
            <View>
            <Image
          style={styles.image}
          
          source={{uri:`${this.props.imageUri}`}}
        />
          
            <Text>
        { this.props.data }
                   </Text>
                  < Button style={{marginTop:150}}
                        onPress={() => {
                          this.setModalVisible(false);
                        }}
                      //  buttonStyle={styles.buttonStyle}
                        title="close"
                    />

                   

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
    marginTop: 20,
    marginLeft: 90,
    height: 200,
    width: 200
  }});