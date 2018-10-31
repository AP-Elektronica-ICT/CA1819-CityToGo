import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet
} from "react-native";

import Maps from "./Maps";
import {Button,Card,CardSection,Input} from './common';

class Home extends Component {
    render() {
        return (
            
            <View style={styles.container}>
            <Button>Login</Button>
                <Maps />
                
            </View>
        );
    }
}
export default Home;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});