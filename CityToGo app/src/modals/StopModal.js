import React, { Component } from "react";
import {
    Modal,
    Text,
    View,
    StyleSheet
} from 'react-native';
import { CustomLargeButton } from "../common/CustomLargeButton"
import { PRIMARY, SECONDARY, WHITE } from '../styles/Colors'


class StopModal extends Component {
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
                    transparent={true}
                    animationType="fade"
                    visible={this.state.modalVisible}
                    onRequestClose={() => { this.setModalVisible(!this.state.modalVisible) }}
                >


                    <View style={styles.Model}>
                        <View style={styles.background}>


                            <Text style={styles.Title}>Stop session</Text>

                            <Text style={styles.Text} >Are you sure you want to stop the current session</Text>

                            <CustomLargeButton
                                color={PRIMARY}
                                onPress={this.props.onPress}
                            >YES </CustomLargeButton>

                            <CustomLargeButton
                                color={SECONDARY}
                                onPress={() => { this.setModalVisible(!this.state.modalVisible); }} >CANCEL</CustomLargeButton>

                        </View>
                    </View>

                </Modal>


            </View>
        );
    }
}

export default StopModal;

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
    }
});