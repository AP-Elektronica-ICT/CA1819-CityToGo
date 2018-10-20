import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet
} from "react-native";
import Maps from './Maps'

class MainScreen extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Maps/>
            </View>
        );
    }
}
export default MainScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});