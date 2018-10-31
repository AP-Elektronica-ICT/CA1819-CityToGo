import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet
} from "react-native";

import Maps from "./Maps";
import Profile from "./Profile";
import { Button } from "./../common/Button";
import { NavigationActions, StackActions } from "react-navigation";


class Home extends Component {
    onButtonPress() {
        const resetAction = StackActions.reset({
            index: 0,

            actions: [

                NavigationActions.navigate({
                    routeName: "Profile",

                    params: {}
                })
            ]

        });
        this.props.navigation.dispatch(resetAction);

    };

    render() {
        const { navigate } = this.props.navigation;
        return (

            // <View style={styles.container} >
            //   <Button>Profile</Button>
            //     <Maps />
            // </View>
            <View style={{ flex: 1 }}>
                <Maps />
                <View style={{
                    position: 'absolute',//use absolute position to show button on top of the map
                    top: '2%', //for center align
                    alignSelf: 'flex-end' //for align to right
                }}>
                    <Button onPress={() => navigate('Profile', { name: 'Jane' })}>Profile</Button>
                </View>
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