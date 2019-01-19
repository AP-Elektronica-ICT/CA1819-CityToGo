import React from 'react'
import {
    ActivityIndicator,
    View,
} from 'react-native'

const CustomSpinner = (color) => {
    return (
    
            <ActivityIndicator size="large" color={color} />
    
    )
}

export default CustomSpinner;

const styles = ({
    container: {
        flex: 1,
        justifyContent: 'center'
    },
    horizontal: {
        flexDirection: 'row',
    }
})