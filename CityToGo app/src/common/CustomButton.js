import React from 'react';
import { Text, TouchableOpacity, Image } from 'react-native';


const CustomButton = ({ onPress, children, color, heightIcon, widthIcon }) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={{
                backgroundColor: color,
                borderRadius: 12,
                shadowColor: 'rgba(0, 0, 0, 0.1)',
                shadowOpacity: 0.8,
                marginTop: 10,
                elevation: 6,
                shadowRadius: 12,
                shadowOffset: { width: 1, height: 13 },
                height: 52,
                width: 52,
                justifyContent: 'center',
                alignItems: 'center'
            }}>
            {/* <Text style={textStyle}>{children}</Text> */}
            <Image
                style={{
                    height: heightIcon,
                    width: widthIcon,
                }}
                source={children} />
        </TouchableOpacity>
    );
};

export { CustomButton };
