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
var token ="OqTaRFz-o3bp17-hHuMql20UYPC1wGCJ";
var data = [];
var metadata;
var Age;
var Full_name;
var location;

class Profiel extends Component {
    constructor(props) {
        super(props)
        // auth0.webAuth.authorize({ scope: 'openid profile email', audience: 'https://shakir01.eu.auth0.com/userinfo' })
        //      .then((credentials) => { console.log(credentials); token = credentials.accessToken });
        //      console.log(token)
        let response = fetch('https://shakir01.eu.auth0.com/userinfo', {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + token,
            },
        }).then((response) => response.json())
            .then(responseJson => data = responseJson).then(console.log(data.nickname));


        metadata =data["https://shakir01.net/user_metadata"];
        console.log(JSON.stringify(metadata));
        if(typeof metadata !="undefined"){
        Age=metadata.Age;
        Full_name=metadata.Full_name;
        location =metadata.Location;
        }
    }


    componentDidMount() {
    
    }

    render() {
        return (
          <View style={styles.container}>
              <View style={styles.header}>
                <View style={styles.headerContent}>
                    <Image style={styles.avatar}
                      source={{uri: 'https://bootdey.com/img/Content/avatar/avatar6.png'}}/>
    
                    <Text style={styles.name}>{Full_name} </Text>
                 
                </View>
              </View>
    
              <View style={styles.body}>
                <View style={styles.item}>
                  <View style={styles.iconContent}>
                    <Image style={styles.icon} source={{uri: 'https://cdn3.iconfinder.com/data/icons/black-easy/512/538642-user_512x512.png'}}/>
                  </View>
                  <View style={styles.infoContent}>
                    <Text style={styles.info}>{Full_name}</Text>
                  </View>
                </View>
    
                <View style={styles.item}>
                  <View style={styles.iconContent}>
                    <Image style={styles.icon} source={{uri: 'http://icons.iconarchive.com/icons/icons8/windows-8/256/Users-Age-icon.png'}}/>
                  </View>
                  <View style={styles.infoContent}>
                    <Text style={styles.info}>{Age}</Text>
                  </View>
                </View>
    
                <View style={styles.item}>
                  <View style={styles.iconContent}>
                    <Image style={styles.icon} source={{uri: 'http://icons.iconarchive.com/icons/graphicloads/100-flat/256/email-2-icon.png'}}/>
                  </View>
                 

                  <View style={styles.infoContent}>
                    <Text style={styles.info}>{data.email}</Text>
                  </View>
                </View>
    
                <View style={styles.item}>
                  <View style={styles.iconContent}>
                    <Image style={styles.icon} source={{uri: 'https://www.amdtelecom.net/wp-content/uploads/2018/08/loc.png'}}/>
                  </View>
                  <View style={styles.infoContent}>
                    <Text style={styles.info}>{location}</Text>
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
        alignItems:'flex-start',
        left:"200%",
        paddingRight:3
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