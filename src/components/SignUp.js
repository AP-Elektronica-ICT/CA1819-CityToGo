import React, { Component } from 'react';
import { View, ImageBackground } from 'react-native';
import { Header } from './common';
import LoginForm from './LoginForm';
import RouterComponent from './Router';
import Router from './Router';
import { Actions } from 'react-native-router-flux';
import { Button, Card, CardSection, Input } from './common';
import App from '../../App';



class SignUp extends Component {
    state={fullName:'',userName:'',email:'',password:''};
    onButtonPress() {

        Actions.Login();
    }


    render() {
        return (
            <ImageBackground source={require('./../assets/antwerp2.png')}style={ styles.background}> 
            <View style={styles.cardStyle}>
            <Card >
                <CardSection >

                    <Input
                        placeholder="First/Last Name"
                        style={{ height: 50, width: 100 }}
                        label="Full Name"
                        value={this.state.fullName}
                        onChangeText={fullName => this.setState({ fullName })} />
                </CardSection>
                <CardSection >

                    <Input
                        placeholder="Max_2019"
                        style={{ height: 50, width: 100 }}
                        label="User Name"
                        value={this.state.userName}
                        onChangeText={userName => this.setState({ userName })} />
                </CardSection>
                <CardSection >

                    <Input
                        placeholder="user@gmail.com"
                        style={{ height: 50, width: 100 }}
                        label="Email"
                        value={this.state.email}
                        onChangeText={email => this.setState({ email })} />
                </CardSection>
                <CardSection>
                    <Input
                        secureTextEntry={true}
                        placeholder="password"
                        label="Password"
                        value={this.state.password}
                        onChangeText={password => this.setState({ password })}
                    />

                </CardSection>
                <CardSection >
                    <Button
                    onPress={()=>this.onButtonPress()}>
                        Register
                    </Button>
                </CardSection> 
            </Card>
            </View>
            </ImageBackground>
        );
    }

}
const styles={
    cardStyle:{
        paddingTop:70
    },
    background:{
        flex: 1,
        position: 'absolute',
        width: '100%',
        height: '100%',
        justifyContent: 'center'
    }
}
export default SignUp;