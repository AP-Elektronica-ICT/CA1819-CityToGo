import React, { Component, } from "react";
import {
    StyleSheet, View, Text
} from "react-native";

import { Button } from 'react-native-elements'
import Maps from "./Maps";
import { withNavigation } from 'react-navigation';

class Home extends Component {

    constructor(props) {
        super(props)
        this.state = {
            token: 0
        }
    }

    componentDidMount() {
        //const { navigation } = this.props;
        this.token = this.props.navigation.getParam("token");

        //this.setState({ token: token })

        console.log(this.token)
        //this.getData(token)
    }


    getData() {
        
        console.log(this.token)
        fetch('http://192.168.1.15:3000/api/monumenten', {
            method: 'GET',
            headers: {
                authorization: 'Bearer ' + this.token 
            }
        })
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson);
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