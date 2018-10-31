import React, { Component } from 'react';
import {Button} from './../common';
import Auth0 from "react-native-auth0";


const auth0 = new Auth0({
    domain: "shakir01.eu.auth0.com",
    clientId: "1b5iyvAzLoy2GKGYbhXaeGcYRbyDIKn8"
  });

  const key;

class Profile extends Component{ 
   
    componentDidMount() {
       
        auth0.webAuth.authorize({scope: 'openid profile email', audience: 'https://shakir01.eu.auth0.com/userinfo'})
        .then(credentials =>
          console.log(credentials )
          // Successfully authenticated
          // Store the accessToken
         )

              }
        
    render(){
        return(
          
                    <Button>
                        Log in
                    </Button>
          
        )
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