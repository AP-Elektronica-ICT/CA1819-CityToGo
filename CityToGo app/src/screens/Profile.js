import React, { Component } from "react";
import { View, Text, StyleSheet, ActivityIndicator, Image,FlatList,ImageBackground } from "react-native";
import Auth0 from "react-native-auth0";
import SInfo from "react-native-sensitive-info"
import { Button } from 'react-native-elements'
import Config from '../config/config'
import { Button2 } from "../common/Button2";
import { NavigationActions, StackActions } from "react-navigation";

const auth0 = new Auth0({
  domain: "shakir01.eu.auth0.com",
  clientId: "1b5iyvAzLoy2GKGYbhXaeGcYRbyDIKn8"
});
var data = [];
var metadata;
var Age;
var Full_name;
var location;


class Profiel extends Component {

  constructor(props) {
    super(props)
    this.state = { fetching: false };
  }

  async componentWillMount() {

    SInfo.getItem("userdata", {}).then(JsonData => {
      data = JSON.parse(JsonData)
      metadata = data["https://shakir01.net/user_metadata"];
      console.log("data goes down here !")
      console.log(data);
      if(typeof metadata != "undefined"){
      Age = metadata.Age;
      Full_name = metadata.FullName;
      location = metadata.Location;
      this.setState({ fetching: true });
      console.log("Meta data is here" + metadata);
     }
     else{
      Full_name=data.name;
      Age="Unknown"
      location= "Antwerpen"
      this.setState({ fetching: true });
    
     }
    });

  }
  logout = () => {
    SInfo.deleteItem("accessToken", {});
    SInfo.deleteItem("refreshToken", {});

    auth0.webAuth
      .clearSession()
      .then(res => {
        console.log("clear session ok");
      })
      .catch(err => {
        console.log("error clearing session: ", err);
      });

    this.gotoLogin(); // go to login screen
  };
  gotoLogin = () => {
    // const { navigate } = this.props.navigation;
    //  navigate('Login');
    const resetAction = StackActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({
          routeName: "Login",

          params: {
            userData: data
          }
        })
      ]

    });
    this.props.navigation.dispatch(resetAction);
  };
     


  // stopCurrentSession(sessionId) {
  //   fetch(`http://${Config.MY_IP_ADRES}:3000/api/v1/userSession/update/${sessionId}`, {
  //     method: 'PUT',
  //     headers: {
  //       authorization: 'Bearer ' + global.token,
  //       Accept: 'application/json',
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({
  //       isRunning: false,
  //     }),
  //   }).then((response) => response.json())
  //     .then((responseJson) => {
  //       console.log(responseJson)
  //     }
  //     ).catch((error) => {
  //       console.error(error);
  //     });
  // }

  // renderSessionStopBttn(sessionId) {
  //   if (sessionId !== undefined) {
  //     return (
  //       <Button
  //         onPress={() => this.stopCurrentSession(sessionId)}
  //         buttonStyle={styles.buttonStyle}
  //         title="Stop session"
  //       />
  //     )
  //   }

  //   return null
  // }

  render() {

    const sessionId = this.props.navigation.getParam("sessionId");
    const { navigate } = this.props.navigation;
    console.log(sessionId)

    if (!this.state.fetching) {
      return (
        <View style={styles.container}>
          <ActivityIndicator
            size="large"
            color="#05a5d1"
            animating={!this.state.fetching}
          />
        </View>

      )
    }


    return (

      <View style={styles.container}>
        <View >
        <ImageBackground source={require('./../assets/background.jpg')} style={styles.header}  imageStyle={{ borderBottomLeftRadius: 12, borderBottomRightRadius:12 }} >
          <View style={styles.headerContent}>
            <Image style={styles.avatar}
              source={{ uri: data.picture }} />

            <Text style={styles.name}>{Full_name} </Text>
            <Text style={styles.name2}>@{data.nickname} </Text>

          </View>
          </ImageBackground>
        </View>

        <View style={styles.body}>
          <View style={styles.item}>
            <View style={styles.iconContent}>
              <Image style={styles.icon} source={require('./../assets/icons/User.png')} />
            </View>
            <View style={styles.infoContent}>
              <Text style={styles.info}>{Full_name}</Text>
            </View>
          </View>

          <View style={styles.item}>
            <View style={styles.iconContent}>
              <Image style={styles.icon} source={require('./../assets/icons/Age.png')} />
            </View>
            <View style={styles.infoContent}>
              <Text style={styles.info}>{Age}</Text>
            </View>
          </View>

          <View style={styles.item}>
            <View style={styles.iconContent}>
              <Image style={styles.icon}  source={require('./../assets/icons/Email.png')} />
            </View>


            <View style={styles.infoContent}>
              <Text style={styles.info}>{data.email}</Text>
            </View>
          </View>

          <View style={styles.item}>
            <View style={styles.iconContent}>
              <Image style={styles.icon} source={require('./../assets/icons/Location.png')} />
            </View>
            <View style={styles.infoContent}>
              <Text style={styles.info}>{location}</Text>
            </View>
            
          </View>
          <View style={styles.item}>
            <View style={styles.extra}>
            
              <Text style={styles.text} onPress={() => navigate('LearnMore')}>Learn More</Text>
              <Text style={styles.text}>About us</Text>
              <Text style={styles.text}>Privacy policy</Text>
              <Text style={styles.logout} onPress={this.logout}>Logout</Text>

            </View>
         
            
          </View>
          
      

        

          {/* {this.renderSessionStopBttn(sessionId)} */}

        </View>
      </View>

    );
  }
}




const styles = StyleSheet.create({
   text:{
     color: "#999999",
     fontSize: 18,
     marginTop: 10
   },
   logout:{
    marginTop: 30,
    color: "#999999",
     fontSize: 18
   },

   extra: {
    flex: 1,
    alignItems: 'flex-start',
    left: 30,
    paddingTop: 30,
    

  },
  header: {
    backgroundColor: "#2A2E43",
    padding:10,
  },
  headerContent: {
    padding: 30,
    alignItems: 'center',
  },
  flatview: {
    justifyContent: 'center',
    paddingTop: 30,
    borderRadius: 2,
  },
  name: {
    fontFamily: 'Verdana',
    fontSize: 18,
    color: "#FFFFFF"
  },
  email: {
    color: 'red'
  },

  avatar: {
    width: 100,
    height: 100,
    borderRadius: 20,
    marginBottom: 10,
  },
  name: {
    fontSize: 22,
    color: "#FFFFFF",
    fontWeight: '600',
  },
  userInfo: {
    fontSize: 16,
    color: "#778899",
    fontWeight: '600',
  },
  container: {
    backgroundColor: "#2A2E43",
    flex:1
 
  },
  body: {
    backgroundColor: "#2A2E43",
    alignItems: 'center',
  },
  item: {
    flexDirection: 'row',
  },
  infoContent: {
    flex: 3,
    alignItems: 'flex-start',
    paddingLeft: 5
  },
  iconContent: {
    flex: 1,
    alignItems: 'flex-start',
    left: 30,
    paddingRight: 3,
    

  },
  icon: {
    width: 30,
    height: 30,
    marginTop: 20,
    
  },
  name2:{
    fontSize: 18,
    color: "#EFEFEF"
  },
  info: {
    fontSize: 18,
    marginTop: 20,
    color: "#FFFFFF",
  }, 
  buttonStyle: {
    backgroundColor: "rgba(255,0,0,1)",
    width: 200,
    height: 45,
    borderColor: "transparent",
    borderWidth: 0,
    borderRadius: 5
  }
});
export default Profiel;



