import React, { Component } from "react";
import {
    Modal,
    Text,
    View,
    StyleSheet,
    Image
} from 'react-native';
import { CustomLargeButton } from "../common/CustomLargeButton"
import { PRIMARY, SECONDARY, WHITE } from '../styles/Colors'

class CameraModal extends Component {
    state = {
        modalVisible: false,
    };

    setModalVisible(visible) {
        this.setState({ modalVisible: visible });
    }


    renderContent() {
        if (!this.props.isFound)
            return (
                <View style={styles.Model}>
                    <View style={styles.background}>


                        <Text style={styles.Title}>Do you want to try again?</Text>

                        <Text style={styles.Text} >It seems that it is not the same monument. If it is the same monument you can skip it and go for the next one.</Text>

                        <CustomLargeButton
                            color={PRIMARY}
                            onPress={this.props.onPressYes}

                        >YES </CustomLargeButton>

                        <CustomLargeButton
                            color={SECONDARY}
                            onPress={this.props.onPress} >SKIP</CustomLargeButton>

                    </View>
                </View>
            )
        else
            return (
                <View style={styles.Model}>
                    <View style={styles.background}>


                        <Text style={styles.Title}>You found it!</Text>

                        <Image style={styles.image} source={require('../assets/icons/customCheckIcon.png')} />

                        <CustomLargeButton
                            color={PRIMARY}
                            onPress={this.props.onPress}
                        >OK </CustomLargeButton>
                        {/* 
                        <CustomLargeButton
                            color={SECONDARY}
                            onPress={() => { this.setModalVisible(!this.state.modalVisible); }} >SKIP</CustomLargeButton> */}

                    </View>
                </View>
            )
    }

    render() {

        return (
            <View style={styles.container}>
                <Modal
                    transparent={true}
                    animationType="fade"
                    visible={this.props.modalVisible}
                    onRequestClose={() => { this.setModalVisible(!this.state.modalVisible) }}
                >

                    {this.renderContent()}


                </Modal>


            </View>
        );
    }
}
export default CameraModal;

const styles = StyleSheet.create({
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
        //alignSelf: 'center',
        color: 'rgba(255,255,255, 0.68);',
        paddingTop: 20,
        paddingBottom: 10,
        paddingRight: 25,
        paddingLeft: 25
    },
    Title: {
        fontSize: 25,
        color: WHITE,
    },
    image: {
        // flex:1,
        marginTop: 20,
        height: 100,
        width: 100,
        marginBottom: 10
    },
});

