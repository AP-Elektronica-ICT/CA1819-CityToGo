import React, { Component, } from "react";
import {
    StyleSheet,
    View,
    Text
} from "react-native";
import SInfo from "react-native-sensitive-info";

import { Button } from 'react-native-elements'
import Maps from "./Maps";
import Profile from "./Profile";
import { NavigationActions, StackActions } from "react-navigation";

const LATITUDE = 29.95539;
const LONGITUDE = 78.07513;
const LATITUDE_DELTA = 0.009;
const LONGITUDE_DELTA = 0.009;


class Home extends Component {


    constructor(props) {
        super(props);
        this.state = {
            latitude: LATITUDE,
            longitude: LONGITUDE,
            polygons: []
        };
    }

    componentDidMount() {
        this.watchID = navigator.geolocation.watchPosition(
            position => {
                const { latitude, longitude } = position.coords;

                this.setState({
                    latitude,
                    longitude,
                });
            },
            error => console.log(error),
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
        );

        SInfo.getItem("accessTokenServer", {}).then(accessToken => {
            global.token = accessToken
        })
    }

    componentWillMount() {
        navigator.geolocation.getCurrentPosition(
            error => alert(error.message),
            {
                enableHighAccuracy: true,
                timeout: 20000,
                maximumAge: 1000
            }
        );

    }

    componentWillUnmount() {
        navigator.geolocation.clearWatch(this.watchID);
    }


    getMonument = async () => {
        fetch('http://192.168.1.15:3000/api/getNextLocation', {
            method: 'POST',
            headers: {
                authorization: 'Bearer ' + global.token,
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                latitude: String(this.state.latitude),
                longitude: String(this.state.longitude)
            }),
        }).then((response) => response.json())
            .then((responseJson) => {
                this.setState({ polygons: responseJson.geometry.coordinates[0] })
                return responseJson;
            })
            .catch((error) => {
                console.error(error);
            });

    }


    getMapRegion = () => ({
        latitude: this.state.latitude,
        longitude: this.state.longitude,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA
    });

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
            <View style={styles.container}>

                <Maps getPolygons={this.state.polygons} getMapRegion={this.getMapRegion.bind(this)} />
                <View style={{
                    position: 'absolute',//use absolute position to show button on top of the map
                    top: '2%', //for center align
                    alignSelf: 'flex-end' //for align to right
                }}>
                    <Button
                        onPress={() => navigate('Profile', { name: 'Jane' })}
                        buttonStyle={styles.buttonStyle}
                        title="Profiel"
                    />
                </View>
                <View style={styles.bottomView}>
                    <Button
                        onPress={this.getMonument}
                        buttonStyle={styles.buttonStyle}
                        title="Start"
                    />
                </View>
            </View>

            // <View style={styles.container} >
            //   <Button>Profile</Button>
            //     <Maps />
            // </View>
            // <View style={{ flex: 1 }}>
            //     <Maps />
            // </View>
        );

    }
}

export default Home;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonStyle: {
        backgroundColor: "rgba(92, 99,216, 1)",
        width: 200,
        height: 45,
        borderColor: "transparent",
        borderWidth: 0,
        borderRadius: 5
    },
    bottomView: {
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: 20
    },
});