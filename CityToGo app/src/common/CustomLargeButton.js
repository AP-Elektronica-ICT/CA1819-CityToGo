    import React from 'react';
    import {Text,TouchableOpacity} from 'react-native';

    const CustomLargeButton =({onPress,children })=>{
        const{buttonStyle,textStyle}=styles
        return(
        <TouchableOpacity onPress={onPress} style={buttonStyle}>
            <Text style={textStyle}>{children}</Text>
        </TouchableOpacity>
        );
    };

    const styles={
        textStyle:{
            alignSelf: 'center',
            color: '#FFFFFF',
            fontSize:16,
            fontWeight: '600',
            paddingTop: 10,
            paddingBottom: 10
        },
        buttonStyle:{
            flex:1,
            alignSelf: 'stretch',
            backgroundColor: '#3ACCE1',
            borderRadius: 15,
            borderWidth:1,
            borderColor: '#3ACCE1',
            marginLeft:8,
            marginRight:8

        }
    };

    export { CustomLargeButton};
