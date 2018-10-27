import React, { Component, } from "react";
import {
    StyleSheet, View, Text
} from "react-native";

import { Button } from 'react-native-elements'
import Maps from "./Maps";

class Home extends Component {


    getData() {

        fetch('http://192.168.1.15:3000', {
            method: 'GET',
            headers: {
                authorization: 'Bearer '
            }
        })
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.error(error);
            });
    }

    render() {
        //const { navigation } = this.props;
        //const token = navigation.getParam("token");
        return (
            <View style={styles.container}>
                <Maps />
                <View style={styles.bottomView}>
                    <Button
                        onPress={this.getData}
                        buttonStyle={styles.buttonStyle}
                        title="Start"
                    />
                </View>
            </View>
        );
    }
}

export default Home;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonStyle: {
        backgroundColor: "rgba(92, 99,216, 1)",
        width: 200,
        height: 45,
        borderColor: "transparent",
        borderWidth: 0,
        borderRadius: 5
    },
    bottomView: {
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: 20
    },
});