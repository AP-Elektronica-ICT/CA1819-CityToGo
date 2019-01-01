import React, { Component } from "react";
import { View, Text, StyleSheet, ActivityIndicator, Image,FlatList } from "react-native";
import { Button } from 'react-native-elements'
import Config from '../config/config'

class SubSessions extends Component {

    
  
    constructor(props) {
      super(props);

      this.state = {
        subSess:[]
    
    };
      
    }

    componentWillMount(){
        let userProfielData =this.props.navigation.getParam("UserId");
        
        let arr = []
        let userId = userProfielData.sub
        console.log(userId);

        fetch(`http://${Config.MY_IP_ADRES}:3000/api/v1/userSession/find/${userId}`)
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson);
                

                for (let z of responseJson) {
                    console.log(z)

                   // console.log(z.subSession.monument.geometry)
                    for(let k of z.subSession)
                    if(z._id == this.props.navigation.getParam("sessionId")){
                    arr.push(

                        k
                    )

                }


                }
                console.log(arr)
                this.setState({ subSess: arr })
               
            }
            ).catch((error) => {
                console.error(error);
            });
    }
   
  
   

  
    render() {

        const sessionId = this.props.navigation.getParam("sessionId");
        console.log(sessionId)
      return (
        <View style={styles.body}>
            <Text style={styles.h2text}>
          Mijn spelsessies
        </Text>

         <FlatList
          data={this.state.subSess }
          showsVerticalScrollIndicator={false}
          renderItem={({item}) =>
          <View style={styles.flatview}>
            <Text style={styles.name}>{item.startTime}</Text>
            <Text style={styles.email}>{item.stopTime}</Text>
          </View>
          }
          keyExtractor={item => item.startTime}
        />
        </View>
      );
    }
  
   

  

  
  }

  const styles = StyleSheet.create({
      body:{
        alignItems: 'center'



      },
  
    flatview: {
      justifyContent: 'center',
      paddingTop: 30,
      borderRadius: 2,
    },
    h2text: {
        marginTop: 10,
        fontFamily: 'Helvetica',
        fontSize: 26,
        fontWeight: 'bold',
      },

    name: {
      fontFamily: 'Verdana',
      fontSize: 18
    },
    email: {
      color: 'red'
    },
  
    
   
  });

  export default SubSessions;