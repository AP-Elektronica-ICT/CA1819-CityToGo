//import libraries
import React from 'react';
import {Text,View} from 'react-native';

//Make components
const Header=(props)=>{
    const {textStyle,viewStyle}=Styles;

    return(
    <View  style={viewStyle}>
    <Text style={textStyle}>{props.headerText}</Text>
    </View>
    );
};

const Styles={
    viewStyle:{
        backgroundColor:"#F8F8F8",
        justifyContent:'center',
        alignItems:'center',
        height:60,
        padding:15,
        shadowColor:'#000',
        shadowOffset: {width:0, height:2},
        shadowOpacity:0.2,
        elevation:2,
        position:'relative'

    },
    textStyle:{
        fontSize:25,
        color:"#000000",
        
    }
};
//Make the component available to other parts of app
export { Header};
