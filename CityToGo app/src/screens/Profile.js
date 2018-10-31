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
class Profiel extends Component {
    

  componentDidMount(){
    auth0.webAuth.authorize({scope: 'openid profile email', audience: 'https://shakir01.eu.auth0.com/userinfo'})
    .then((credentials) => {console.log(credentials);token=credentials.accessToken}
      
     )
     console.log(token)
      let response = fetch('https://shakir01.eu.auth0.com/userinfo', {
         method: 'GET',
         headers: {
          'Accept': 'application/json',
           'Content-Type': 'application/json',
           Authorization: 'Bearer ' + token,
         },
       });
       console.log(response);
       debugger;
    }
    render() {
        return (
            <View style={styles.container}>
                <Text>Profiel</Text>
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