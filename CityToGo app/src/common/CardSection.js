import React from 'react';
import { View } from 'react-native';

const CardSection = (props) => {
    return (
        <View style={styles.containerStyle}>
            {props.children}</View>
    );
};

const styles = {
    containerStyle: {
        borderBottomWidth: 0,
        padding: 10,
        //paddingBottom:50,
        backgroundColor: '#fff',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        borderColor: '#ddd',
        position: 'relative',
        backgroundColor: 'transparent'

    }
}

export { CardSection };