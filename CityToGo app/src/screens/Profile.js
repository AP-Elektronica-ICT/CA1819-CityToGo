import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
     Image,
} from "react-native";
import Auth0 from "react-native-auth0";

const auth0 = new Auth0({
    domain: "shakir01.eu.auth0.com",
    clientId: "1b5iyvAzLoy2GKGYbhXaeGcYRbyDIKn8"
});
var token;
var data = [];

class Profiel extends Component {
    constructor(props) {
        super(props)
        auth0.webAuth.authorize({ scope: 'openid profile email', audience: 'https://shakir01.eu.auth0.com/userinfo' })
            .then((credentials) => { console.log(credentials); token = credentials.accessToken });
    }


    componentDidMount() {

        console.log(token)
        let response = fetch('https://shakir01.eu.auth0.com/userinfo', {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + token,
            },
        }).then((response) => response.json())
            .then(responseJson => data = responseJson).then(console.log(data.nickname));


        const  metadata = data["https://shakir01.eu.auth0.com/user_metadata"]
        console.log(metadata);  
    
    }

    render() {
        return (
          <View style={styles.container}>
              <View style={styles.header}>
                <View style={styles.headerContent}>
                    <Image style={styles.avatar}
                      source={{uri: 'https://bootdey.com/img/Content/avatar/avatar6.png'}}/>
    
                    <Text style={styles.name}>{data.email} </Text>
                    <Text style={styles.userInfo}>{data.email}</Text>
                    <Text style={styles.userInfo}> {data.nickname} </Text>
                </View>
              </View>
    
              <View style={styles.body}>
                <View style={styles.item}>
                  <View style={styles.iconContent}>
                    <Image style={styles.icon} source={{uri: 'https://png.icons8.com/home/win8/50/ffffff'}}/>
                  </View>
                  <View style={styles.infoContent}>
                    <Text style={styles.info}>Home</Text>
                  </View>
                </View>
    
                <View style={styles.item}>
                  <View style={styles.iconContent}>
                    <Image style={styles.icon} source={{uri: 'https://png.icons8.com/settings/win8/50/ffffff'}}/>
                  </View>
                  <View style={styles.infoContent}>
                    <Text style={styles.info}>Settings</Text>
                  </View>
                </View>
    
                <View style={styles.item}>
                  <View style={styles.iconContent}>
                    <Image style={styles.icon} source={{uri: 'https://png.icons8.com/news/win8/50/ffffff'}}/>
                  </View>
                  <View style={styles.infoContent}>
                    <Text style={styles.info}>News</Text>
                  </View>
                </View>
    
                <View style={styles.item}>
                  <View style={styles.iconContent}>
                    <Image style={styles.icon} source={{uri: 'https://png.icons8.com/shopping-basket/ios11/50/ffffff'}}/>
                  </View>
                  <View style={styles.infoContent}>
                    <Text style={styles.info}>Shop</Text>
                  </View>
                </View>
    
              </View>
          </View>
        );
      }
    }
    
    const styles = StyleSheet.create({
      header:{
        backgroundColor: "#DCDCDC",
      },
      headerContent:{
        padding:30,
        alignItems: 'center',
      },
      avatar: {
        width: 130,
        height: 130,
        borderRadius: 63,
        borderWidth: 4,
        borderColor: "white",
        marginBottom:10,
      },
      name:{
        fontSize:22,
        color:"#000000",
        fontWeight:'600',
      },
      userInfo:{
        fontSize:16,
        color:"#778899",
        fontWeight:'600',
      },
      body:{
        backgroundColor: "#778899",
        height:500,
        alignItems:'center',
      },
      item:{
        flexDirection : 'row',
      },
      infoContent:{
        flex:1,
        alignItems:'flex-start',
        paddingLeft:5
      },
      iconContent:{
        flex:1,
        alignItems:'flex-end',
        paddingRight:5,
      },
      icon:{
        width:30,
        height:30,
        marginTop:20,
      },
      info:{
        fontSize:18,
        marginTop:20,
        color: "#FFFFFF",
      }
    });
    export default Profiel;