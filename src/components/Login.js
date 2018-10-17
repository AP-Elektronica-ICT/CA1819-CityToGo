import React, { Component } from 'react';
import { View, Text, ImageBackground } from 'react-native';
import LoginForm from './LoginForm';
import { Actions } from 'react-native-router-flux';

class Login extends Component {

    onButtonPress() {

        Actions.SignUp();
    }

    render() {
        return (

            <View style={styles.loginCard}>
                <LoginForm />
                <Text style={styles.textStyle}>Don't have an account sign up <Text
                    onPress={() => this.onButtonPress()}
                    style={styles.hereStyle}>here</Text></Text>
            </View>
        );
    }
}

const styles = {
    loginCard: {
        marginTop: 60,
    },
    background: {
        backgroundColor: "#FFFFFF"
    },
    textStyle: {
        fontSize: 16,
        paddingTop: 40,
        color: '#FFFFFF'
    },
    hereStyle: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        fontSize: 20,
        textDecorationLine: 'underline'
    }
}

export default Login;