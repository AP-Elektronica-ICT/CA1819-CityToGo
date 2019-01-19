import React, { Component } from 'react';
import { Modal, Text, View, Image, StyleSheet } from 'react-native';
import { CustomLargeButton } from "../common/CustomLargeButton"
import { PRIMARY, SECONDARY, WHITE } from "../styles/Colors";


class MonumentModal extends Component {
  state = {
    modalVisible: false,

  };

  setModalVisible(visible) {
    this.setState({ modalVisible: visible })
  }

  renderStartButton() {
    if (this.props.modalStartButtonVisible)
      return (

        < CustomLargeButton
          color={PRIMARY}
          onPress={this.props.onPress} >
          LET'S GO</CustomLargeButton>
      )
  }



  renderModalContent() {
    if (this.props.modalContentVisible)
      return (

        <View style={styles.Model}>
          <View style={styles.background}>
            <Image style={styles.image} source={{ uri: `${this.props.imageUrl}` }} />
            {/* blurRadius={this.props.blur} */}
            <Text style={styles.Text} > {this.props.monumentName}</Text>
            {this.renderStartButton()}
            < CustomLargeButton
              color={SECONDARY}
              onPress={() => { this.setModalVisible(!this.state.modalVisible) }} >
              CANCEL</CustomLargeButton>
          </View>
        </View >
      )


  }


  render() {

    return (
      <View style={styles.container}>
        <Modal
          transparent={true}
          animationType="slide"
          visible={this.state.modalVisible}
          onRequestClose={() => { this.setModalVisible(!this.state.modalVisible) }}
        >
          {this.renderModalContent()}

        </Modal>


      </View>
    );
  }
}


export default MonumentModal;

const styles = StyleSheet.create({
  image: {
    // flex:1,
    marginTop: 20,
    height: 300,
    borderRadius: 15,
    width: 220
  },

  Model: {
    flexDirection: 'row',
    flex: 1,
    //backgroundColor: 'black',
    backgroundColor: 'rgba(255,255,255,0.5)',
    justifyContent: 'center',
    alignItems: 'center',

  },
  background: {
    position: 'absolute',
    backgroundColor: '#2A2E43',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 60,
    marginBottom: 60,
    marginRight: 50,
    marginLeft: 50,
    borderRadius: 20,
    paddingTop: 10,
    paddingBottom: 20,
    width: 350,
    padding: 10

  },
  Text: {
    alignSelf: 'center',
    color: 'rgba(255,255,255, 0.68);',
    paddingTop: 20,
    paddingBottom: 10,
    paddingRight: 25,
    paddingLeft: 25
  }
});