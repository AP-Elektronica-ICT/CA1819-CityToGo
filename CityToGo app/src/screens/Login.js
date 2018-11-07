import React, { Component } from "react";
import { View, Text, Button, ActivityIndicator } from "react-native";
import { NavigationActions, StackActions } from "react-navigation";
import Auth0 from "react-native-auth0";
//import Config from "react-native-config";
//import DeviceInfo from "react-native-device-info";
import SInfo from "react-native-sensitive-info";
import RNRestart from "react-native-restart";

import {
  headerColorStyle,
  headerTextColorStyle,
  buttonStyle
} from "../styles/colors";

import styles from "../styles/Login";
import Config from "../config/config"

const auth0 = new Auth0({
  domain: Config.AUTH0_DOMAIN,
  clientId: Config.AUTH0_CLIENT_ID
});

export default class uniLogin extends Component {

  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: "Login",
      headerStyle: {
        backgroundColor: headerColorStyle
      },
      headerTitleStyle: {
        color: headerTextColorStyle
      }
    };
  };

  constructor(props) {
    super(props)
    this.state = {
      hasInitialized: false
    };
  }

  componentDidMount() {

    console.log("boom panes!");

    this.getJWToken()

    //this.getJWToken().then(response => this.setState({ token: response }))

    SInfo.getItem("accessToken", {}).then(accessToken => {
      if (accessToken) {
        auth0.auth
          .userInfo({ token: accessToken })
          .then(data => {
            this.gotoHome(data);
          })
          .catch(err => {

            SInfo.getItem("refreshToken", {}).then(refreshToken => {
              auth0.auth
                .refreshToken({ refreshToken: refreshToken })
                .then(newAccessToken => {
                  SInfo.setItem("accessToken", newAccessToken);
                  RNRestart.Restart();
                })
                .catch(err2 => {
                  console.log("err getting new access token");
                  console.log(err2);
                });
            });
            console.log(err)
          });
      } else {

        this.setState({
          hasInitialized: true
        });
        console.log("no access token");
      }
    });

  }

  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator
          size="large"
          color="#05a5d1"
          animating={!this.state.hasInitialized}
        />
        {this.state.hasInitialized && (
          <Button onPress={this.login} title="Login" color={buttonStyle} />
        )}
      </View>
    );
  }

  login = () => {

    

    auth0.webAuth
      .authorize({
        scope: Config.AUTH0_SCOPE,
        audience: Config.AUTH0_AUDIENCE,
        device: "lqf6ddg6dfsg6",
        prompt: "login"
      })
      .then(res => {
        auth0.auth
          .userInfo({ token: res.accessToken })
          .then(data => {
            this.gotoHome(data);
          })
          .catch(err => {
            console.log("err: ");
            console.log(JSON.stringify(err));
          });

        SInfo.setItem("accessToken", res.accessToken, {});
        SInfo.setItem("refreshToken", res.refreshToken, {});
      })
      .catch(error => {
        console.log("error occurrdzz");
        console.log(error);
      });
  };

  gotoHome = data => {
    this.setState({
      hasInitialized: true
    });
    const resetAction = StackActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({
          routeName: "Home",
          params: {
            name: data.name,
            picture: data.picture,
            //token: this.state.token
          }
        })
      ]
    });
    this.props.navigation.dispatch(resetAction);
  };

  getJWToken() {
    fetch('https://citytogo.eu.auth0.com/oauth/token', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        client_id: '5FWBdAaaZg8DeUmzKNt3W0tBY7PeMnmu',
        client_secret: "MAJZxQIq5cxodpvdorCRIdNhzVyaofVfBwTDLvo7v5GrOUO0ezD4cyjOR3QIhC12",
        audience: "http://localhost:3000/",
        grant_type: "client_credentials",
      }),
    })
      .then((response) => response.json())

      .then((responseJson) => {
        //return responseJson.access_token
        //console.log(responseJson.access_token)
        SInfo.setItem("accessTokenServer", responseJson.access_token,{});
    
      })
      .catch((error) => {
        console.error(error);
      });
  }

}