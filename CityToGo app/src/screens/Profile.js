import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet
} from "react-native";
import Auth0 from "react-native-auth0";

const auth0 = new Auth0({
    domain: "shakir01.eu.auth0.com",
    clientId: "1b5iyvAzLoy2GKGYbhXaeGcYRbyDIKn8"
});
var token;
var data = [];

class Profiel extends Component {
    constructor(props) {
        super(props)
        auth0.webAuth.authorize({ scope: 'openid profile email', audience: 'https://shakir01.eu.auth0.com/userinfo' })
            .then((credentials) => { console.log(credentials); token = credentials.accessToken });
    }


    componentDidMount() {

        console.log(token)
        let response = fetch('https://shakir01.eu.auth0.com/userinfo', {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + token,
            },
        }).then((response) => response.json())
            .then(responseJson => data = responseJson).then(console.log(data));



        console.log(data);  
    }
    render() {
        return (
            <View style={styles.container}>
                <Text>Profle</Text>    
            </View>
        );
    }

}
export default Profiel;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});