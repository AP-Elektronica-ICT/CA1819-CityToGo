import React, { Component } from 'react';
import {Button,Card,CardSection,Input} from './common';
import {Actions} from 'react-native-router-flux';
import {View,Text,ImageBackground} from 'react-native';





class StartPage extends Component{ 
   

    already(){
        Actions.Login();
       
    }
    withEmail(){
        Actions.SignUp();
    }


    render(){
        return(
            <View style={ styles.start}>
            <Card >
                
                <CardSection >
                    <Button
                    onPress={()=>this.withFacebook()}>
                        Continue with Facebook
                    </Button>
                </CardSection> 
                <CardSection >
                    <Button
                    onPress={()=>this.withGmail()}>
                       Continue with Gmail
                    </Button>
                </CardSection> 
                <CardSection >
                    <Button
                    onPress={()=>this.withEmail()}>
                        Sign up with Email
                    </Button>
                </CardSection> 
                <CardSection>
                <Text 
                  onPress={()=>this.already()}> Already have an Account ?</Text>
                </CardSection>
                
            </Card>
            </View>
        );
    }
}

const styles={
    start:{
        paddingTop:90
    }
}
export default StartPage;