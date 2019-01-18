import React, { Component } from "react";
import { View, Text, ActivityIndicator, ImageBackground } from "react-native";
import { NavigationActions, StackActions } from "react-navigation";
import Auth0 from "react-native-auth0";
//import Config from "react-native-config";
//import DeviceInfo from "react-native-device-info";
import SInfo from "react-native-sensitive-info";
import RNRestart from "react-native-restart";
import { CustomLargeButton, CardSection } from "./../common"


import styles from "../styles/Login";
import Config from "../config/config"
import { Button2 } from "../common/Button2";

const auth0 = new Auth0({
  domain: Config.AUTH0_DOMAIN,
  clientId: Config.AUTH0_CLIENT_ID
});


export default class uniLogin extends Component {



  constructor(props) {
    super(props)
    this.state = {
      hasInitialized: false
    };
  }

  componentDidMount() {

    console.log("boom panes!");

    this.getJWToken()

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
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <ImageBackground source={require('./../assets/background.jpg')} style={styles.container}>
          <ActivityIndicator
            size="large"
            color="#05a5d1"
            animating={!this.state.hasInitialized}
          />
          <CardSection>
            <Text style={styles.textStyle}>Welcome to CityToGO</Text>
          </CardSection>
          {this.state.hasInitialized && (
            <CardSection>
              <CustomLargeButton onPress={this.login}>CONTINUE</CustomLargeButton>
            </CardSection>

          )}
          <CardSection>
            <Button2 onPress={() => navigate('LearnMore')}>LEARN MORE</Button2>
          </CardSection>
        </ImageBackground>
      </View>
    );
  }

  login = () => {
    auth0.webAuth
      .authorize({
        scope: "openid profile email",
        audience: "https://shakir01.eu.auth0.com/userinfo",
        device: "lqf6ddg6dfsg6",
        prompt: "login",
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
    SInfo.setItem("userdata", JSON.stringify(data), {});
    this.setState({
      hasInitialized: true
    });
    const resetAction = StackActions.reset({
      index: 0,

      actions: [

        NavigationActions.navigate({
          routeName: "Home",

          params: {
            userData: data
          }
        })
      ]

    });
    this.props.navigation.dispatch(resetAction);
  };

  getJWToken() {
    fetch('https://shakir01.eu.auth0.com/oauth/token', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        client_id: 'T6Jq2x7zx2WYrJud4QQODiC168XdKcro',
        client_secret: "AcOz94Rfu106VhLUj7qRrVdW7_UVh-_lywydtP07C1emAgO_OAGDO56OMS67hStY",
        audience: "http://localhost:3000/",
        grant_type: "client_credentials",
      }),
    })
      .then((response) => response.json())

      .then((responseJson) => {
        SInfo.setItem("accessTokenServer", responseJson.access_token, {});

      })
      .catch((error) => {
        console.error(error);
      });
  }

}