import React, { Component } from "react";
import {View,Text,StyleSheet,ActivityIndicator,Image} from "react-native";
import Auth0 from "react-native-auth0";
import SInfo from "react-native-sensitive-info"

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
      console.log(data.nickname)
      metadata = data["https://shakir01.net/user_metadata"];
      Age = metadata.Age;
      Full_name = metadata.FullName;
      location = metadata.Location;
      this.setState({ fetching: true });
    });

  }

  render() {
    console.log('render ' + data.nickname)
    // if (!this.state.fetching) {
    //   return (
    //     <View style={styles.container}>

    //       <ActivityIndicator
    //         size="large"
    //         color="#05a5d1"
    //         animating={!this.state.fetching}
    //       />
    //     </View>

    //   )
    // }
    return (

      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <Image style={styles.avatar}
              source={{ uri: data.picture }} />

            <Text style={styles.name}>{Full_name} </Text>

          </View>
        </View>

        <View style={styles.body}>
          <View style={styles.item}>
            <View style={styles.iconContent}>
              <Image style={styles.icon} source={{ uri: 'https://cdn3.iconfinder.com/data/icons/black-easy/512/538642-user_512x512.png' }} />
            </View>
            <View style={styles.infoContent}>
              <Text style={styles.info}>{Full_name}</Text>
            </View>
          </View>

          <View style={styles.item}>
            <View style={styles.iconContent}>
              <Image style={styles.icon} source={{ uri: 'http://icons.iconarchive.com/icons/icons8/windows-8/256/Users-Age-icon.png' }} />
            </View>
            <View style={styles.infoContent}>
              <Text style={styles.info}>{Age}</Text>
            </View>
          </View>

          <View style={styles.item}>
            <View style={styles.iconContent}>
              <Image style={styles.icon} source={{ uri: 'http://icons.iconarchive.com/icons/graphicloads/100-flat/256/email-2-icon.png' }} />
            </View>


            <View style={styles.infoContent}>
              <Text style={styles.info}>{data.email}</Text>
            </View>
          </View>

          <View style={styles.item}>
            <View style={styles.iconContent}>
              <Image style={styles.icon} source={{ uri: 'https://www.amdtelecom.net/wp-content/uploads/2018/08/loc.png' }} />
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
  header: {
    backgroundColor: "#DCDCDC",
  },
  headerContent: {
    padding: 30,
    alignItems: 'center',
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    marginBottom: 10,
  },
  name: {
    fontSize: 22,
    color: "#000000",
    fontWeight: '600',
  },
  userInfo: {
    fontSize: 16,
    color: "#778899",
    fontWeight: '600',
  },
  body: {
    backgroundColor: "#778899",
    height: 500,
    alignItems: 'center',
  },
  item: {
    flexDirection: 'row',
  },
  infoContent: {
    flex: 1,
    alignItems: 'flex-start',
    paddingLeft: 5
  },
  iconContent: {
    flex: 1,
    alignItems: 'flex-start',
    left: "200%",
    paddingRight: 3
  },
  icon: {
    width: 30,
    height: 30,
    marginTop: 20,
  },
  info: {
    fontSize: 18,
    marginTop: 20,
    color: "#FFFFFF",
  }
});
export default Profiel;



//Extra's

  //   auth0.webAuth.authorize({ scope: 'openid profile email', audience: 'https://shakir01.eu.auth0.com/userinfo' })
  //   .then((credentials) => { console.log(credentials); token = credentials.accessToken });
  // console.log(token)
   // this.componentDidMount = this.componentDidMount.bind(this);


     //Fetching Userinfo here
  // getData(token) {
  //   return fetch('https://shakir01.eu.auth0.com/userinfo', {
  //     method: 'GET',
  //     headers: {
  //       Authorization: 'Bearer ' + token,
  //     },
  //   }).then((response) => { return response.json() })
  // };