import React, { Component, } from "react";
import {
    StyleSheet, View
} from "react-native";

import { Button } from 'react-native-elements'
import Maps from "./Maps";

class Home extends Component {

    getToken() {
        fetch('https://citytogo.eu.auth0.com/oauth/token', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                client_id: '5FWBdAaaZg8DeUmzKNt3W0tBY7PeMnmu',
                client_secret: "MAJZxQIq5cxodpvdorCRIdNhzVyaofVfBwTDLvo7v5GrOUO0ezD4cyjOR3QIhC12",
                audience: "http://localhost:3000/",
                grant_type: "client_credentials",
            }),
        })
            .then((response) => response.json())
            .then((responseJson) => {
                return responseJson.access_token
            })
            .catch((error) => {
                console.error(error);
            });
    }

    getData() {
        token = getToken()
        return fetch('http://192.168.1.15:3000', {
            method: 'GET',
            headers: {
                authorization: 'Bearer ' + token
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
        return (
            <View style={styles.container}>
                <Maps>
                </Maps>
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