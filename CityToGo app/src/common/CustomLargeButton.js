import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

const CustomLargeButton = ({ onPress, children, color }) => {

    return (
        <TouchableOpacity
            onPress={onPress} style={{
                flex: 1,
                alignSelf: 'stretch',
                backgroundColor: color,
                borderRadius: 15,
                borderWidth: 1,
                borderColor: 'color',
                marginLeft: 8,
                marginRight: 8,
                marginTop: 10
            }}>
            <Text
                style={{
                    alignSelf: 'center',
                    color: '#FFFFFF',
                    fontSize: 16,
                    fontWeight: '600',
                    paddingTop: 10,
                    paddingBottom: 10
                }}>{children}</Text>
        </TouchableOpacity>
    );
};

export { CustomLargeButton };
