import React, { Component } from 'react';
import { Text,View,ImageBackground,Image,ScrollView } from 'react-native';

class LearnMore extends Component {

  render() {
  
    return (
     
        <ScrollView contentContainerStyle={styles.container}>
    
        <Image source={require('./../assets/background.jpg')} style={styles.image}>
          </Image>
          <Text style={styles.gettingStarted}>Getting started!</Text>
    
          <Text style={styles.text}>he location of the City Game has varied between both on-campus and off-campus venues for both schools and throughout their history, they have also shared venues to use as their home floor. Both Pittsburgh and Duquesne used the Pitt Pavilion, located inside of Pitt Stadium, for their home games until January 28, 1939 when Pitt's director of athletics Jimmy Hagan announced a cessation of basketball relations with Duquesne following the development of bad blood between the schools on the court.[1] The series returned in 1953 at Pitt's home floor, Fitzgerald Field House, that had opened in 1951. This facility on the campus of the University of Pittsburgh would serve as the home floor of the Panthers through the opening of the Petersen Events Center in 2002, although Pitt played select home games at the Pittsburgh Civic Arena in the 1980s and 1990s. Duquesne also used Fitzgerald Field House as its home floor following the demolition of its home court, Duquesne Gardens, in 1956. Duquesne began playing games in the Civic Arena as early as December 1961 and subsequently switched to using the Civic Arena as its primary home floor between 1964–88. Duquesne moved into a new on-campus home at the A. J. Palumbo Center beginning in the 1988–89 season. From 1990–2001, the series was back to being played at the Civic Arena/Mellon Arena. The series then rotated on a yearly basis between the on-campus venues of the Petersen Events Center and the A. J. Palumbo Center.</Text>
    
        
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
      padding:10,
    
  },
  gettingStarted:{
    fontSize:40,
    fontWeight: '500',
    paddingTop: 10,
    paddingBottom: 6,
    justifyContent:"center",
    textAlign: 'center',

},
};

export default LearnMore;
