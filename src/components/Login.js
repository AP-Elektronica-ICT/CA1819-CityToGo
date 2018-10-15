import React, { Component } from 'react';
import {View,Text,ImageBackground} from 'react-native';
import {Header} from './common';
import LoginForm from './LoginForm';
import SignUp from './SignUp';
import RouterComponent from './Router';
import Router from './Router';
import {Actions} from 'react-native-router-flux';
import App from './../../App';





class Login extends Component{ 

    onButtonPress(){
       
    Actions.SignUp();
    }


    render(){
        return(
            <ImageBackground source={require('./../assets/antwerp2.png')}style={ styles.background}> 
            <View style={ styles.loginCard}>   
                <LoginForm />
                <Text style={styles.textStyle}>Don't have an account sign up <Text 
                  onPress={()=>this.onButtonPress()}
                style={styles.hereStyle}>here</Text></Text>
            </View>
            </ImageBackground>
        );
    }

}
const styles={
    loginCard:{
        marginTop:60,
        
     
        
    },
    background:{
        flex: 1,
        position: 'absolute',
        width: '100%',
        height: '100%',
        justifyContent: 'center'
    },
    textStyle:{
        fontSize:16,
        paddingTop:40,
        color:'#FFFFFF'
    },
    hereStyle:{
        color:'#FFFFFF',
        fontWeight:'bold',
        fontSize:20,
        textDecorationLine:'underline'
}


}

export default Login;