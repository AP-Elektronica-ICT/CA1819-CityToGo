import React, { Component, } from "react";
import {
    StyleSheet,
    View,
    Text
} from "react-native";
import SInfo from "react-native-sensitive-info";

import { Button } from 'react-native-elements'
import Maps from "./Maps";


class Home extends Component {


    constructor(props) {
        super(props)

    }

    componentDidMount() {
        SInfo.getItem("accessTokenServer", {}).then(accessToken => {
            global.token = accessToken
        })
    }



    getMonument = async () => {
        // return fetch('http://192.168.1.15:3000/api/monumenten', {
        //     method: 'GET',
        //     headers: {
        //         authorization: 'Bearer ' + global.token
        //     }
        // })
        //     .then((response) => response.json())
        //     .then((responseJson) => {
        //         console.log(responseJson);
        //         return responseJson
        //     })
        //     .catch((error) => {
        //         console.error(error);
        //         throw error
        //     });
        //debugger
        fetch('http://192.168.1.15:3000/api/getNextLocation', {
            method: 'POST',
            headers: {
                authorization: 'Bearer ' + global.token,
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                latitude: "51.25705",
                longitude: "4.45098"
            }),
        }).then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson)
                return responseJson;
            })
            .catch((error) => {
                console.error(error);
            });
    }

    render() {

        return (
            <View style={styles.container}>

                <Maps />
                <View style={styles.bottomView}>
                    <Button
                        onPress={this.getMonument}
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