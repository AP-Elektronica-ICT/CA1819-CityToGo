/**
 * Auth0Sample 00-Login
 * https://github.com/auth0/react-native-auth0
 * @flow
 */

import React, { Component } from 'react';
import {
  Alert,
  AppRegistry,
  Button,
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import Auth0 from 'react-native-auth0';
import {Actions} from 'react-native-router-flux';

var credentials = require('./auth0-credentials');
const auth0 = new Auth0(credentials);

export default class Auth0Sample extends Component {
  constructor(props) {
    super(props);
    this.state = { accessToken: null };
  }

  componentWillMount(){
    this._onLogin();
  }

  _onLogin = () => {
    auth0.webAuth
      .authorize({
        scope: 'openid profile',
        audience: 'https://' + credentials.domain + '/userinfo'
      })
      .then(credentials => {
        // Alert.alert(
        //   'Success',
        //   'AccessToken: ' + credentials.accessToken,
        //   [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
        //   { cancelable: false }
        // );
        this.setState({ accessToken: credentials.accessToken });
        Actions.MainScreen()
      })
      .catch(error => console.log(error));
  };

  _onLogout = () => {
    if (Platform.OS === 'android') {
      this.setState({ accessToken: null });
    } else {
      auth0.webAuth
        .clearSession({})
        .then(success => {
          this.setState({ accessToken: null });
        })
        .catch(error => console.log(error));
    }
  };

  render() {
    //let loggedIn = this.state.accessToken === null ? false : true;
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Auth0Sample - Login</Text>
        <Text>
         
        </Text>
        <Button
          onPress={this._onLogin}
          title={'Log In'}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  header: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  }
});


