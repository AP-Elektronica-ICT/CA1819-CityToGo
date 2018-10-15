import React, { Component } from 'react';
import {Button,Card,CardSection,Input} from './common';
import {Actions} from 'react-native-router-flux';
import Router from './Router';
import App from './../../App';




class LoginForm extends Component{ 
    state={email:'',password:''};

    onButtonPress(){
        if(this.state.email=="mj" && this.state.password=="mj"){
    Actions.App();
    this.state.email='';
    this.state.password='';
    }
}

    render(){
        return(
            <Card>
                <CardSection >

                    <Input 
                    placeholder="user@gmail.com" 
                    style={{height:50,width:100}}
                    label="Email" 
                    value= {this.state.email} 
                    onChangeText={email=>this.setState({email})}/>
                </CardSection>
                <CardSection>
                    <Input 
                    secureTextEntry={true}
                    placeholder="password"
                    label="Password"
                    value={this.state.password}
                    onChangeText={password=>this.setState({password})}
                    />
                   
                </CardSection>
                
           

                <CardSection >
                    <Button
                    onPress={()=>this.onButtonPress()}>
                        Log in
                    </Button>
                </CardSection> 
            </Card>
        )
    }
}

export default LoginForm;