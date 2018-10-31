import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet
} from "react-native";

class Profiel extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>Profiel</Text>
            </View>
        );
    }
}
export default Profiel;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});