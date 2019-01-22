import React, { Component } from 'react';
import { Text,View,ImageBackground,Image,ScrollView } from 'react-native';

class LearnMore extends Component {

  render() {
  
    return (
     
        <ScrollView contentContainerStyle={styles.container}>
    
        <Image source={require('./../assets/background.jpg')} style={styles.image}>
          </Image>
          <Text style={styles.gettingStarted}>Getting started!</Text>
    
          <Text style={styles.text}>CityToGo is een ARG (Alternate Reality Game) . Het is een leuke interactieve spel om nieuwe steden te ontdekken. CItyToGo is de eerste city game waarin de nieuwe technologieën zoals AR(Augmented Reality),Image recagnation, realtime maps enz geïmplementeerd zijn. De interactie tussen gebruiker en het spel maakt CityToGo bijzonder special maar niet alleen dat, het bouwt ook je algemene kennis  door vragen te beantwoorden tijdens het spel. 
          {"\n"}{"\n"}

<Text style={styles.spelregels}>Spelregels:</Text>
{"\n"}

Om CityToGo te kunnen spelen, moet je een account aanmaken of je facebook/google account gebruiken. Na aanmelden moet je op  <Image source={require('./../assets/Start.png')} style={styles.imageText}></Image> drukken om het spel te starten.
De checkpoint (monument)  <Image source={require('./../assets/icons/checkpoint.png')} style={styles.imageText}></Image>verschijnt op de map enkel als je in de range (15 meters)bent van de checkpoint. Om bonussen te verdienen kan je de quizjes   <Image source={require('./../assets/icons/quiz.png')} style={styles.imageText}></Image> oplossen, quizjes zijn klikbaar enkel als je in de afstand van 15 meter bent.  Na het vinden van checkpoint moet je erop tikken en een foto te trekken om je jackpot bonus te unlocken  en een Unique AR te ervaren.
</Text>
    
        
        </ScrollView>
    
   
     );
  }
}

const styles = {
  errorTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red'
  },
  container: {
   alignItems:'center',
   padding:30,
  },
  image: {
    width:320 ,
    height: 250,
    padding:30,
    borderRadius: 20,
  
  },
  text:{
      padding:15,
      fontSize:15,
    
  },
  gettingStarted:{
    fontSize:40,
    fontWeight: '500',
    paddingTop: 10,
    paddingBottom: 6,
    justifyContent:"center",
    textAlign: 'center',

},
spelregels:{
  fontSize:20,
  fontWeight: '500',
  paddingTop: 10,
  paddingBottom: 6,


},
imageText: {
  width:30 ,
  height: 30,
  padding:30,
  borderRadius: 20,

},
};

export default LearnMore;
