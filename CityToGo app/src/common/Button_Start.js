import React from 'react';
import {Text,TouchableOpacity,Image} from 'react-native';

const Button_Start =({onPress,children})=>{
    var{buttonStyle,iconStyle}=styles
    return(
    <TouchableOpacity onPress={onPress} style={buttonStyle}>
        {/* <Text style={textStyle}>{children}</Text> */}
        <Image style={iconStyle} source={children} />
    </TouchableOpacity>
    );
};

var styles={
    iconStyle:{
        height:30,
        width:30,
    },
    buttonStyle:{
        backgroundColor: '#3ACCE1',
        borderRadius: 12,
        shadowColor: 'rgba(0, 0, 0, 0.1)',
        shadowOpacity: 0.8,
        marginTop:10,
        elevation: 6,
        shadowRadius: 12,
        shadowOffset : { width: 1, height: 13},
        height:52,
        width:52,
        justifyContent: 'center',
        alignItems: 'center'

       
     

    }
};

export { Button_Start};
