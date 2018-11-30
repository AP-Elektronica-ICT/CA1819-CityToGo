import React, { Component, } from "react";
import {
    StyleSheet,
    View
} from "react-native";
import SInfo from "react-native-sensitive-info";
import { Button } from 'react-native-elements'
import Maps from "./Maps";

const LATITUDE = 0;
const LONGITUDE = 0;
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
        fetch('http://172.16.182.172:3000/api/getNextLocation', {
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
                console.log(responseJson.properties)
                this.mapPolygon(responseJson)
                this.getMonumentsProperties(responseJson.properties)
            })
            .catch((error) => {
                console.error(error);
            });
    }

    getMonumentsProperties(monumentsProps){
        return monumentsProps
    }

    mapPolygon(responseJson) {
        const polygon = responseJson.geometry.coordinates[0].map(coordsArr => {
            let coords = {
                latitude: coordsArr[1],
                longitude: coordsArr[0],
            }
            return coords;
        });

        this.setState({ polygons: polygon })
    }

    getMapRegion = () => ({
        latitude: this.state.latitude,
        longitude: this.state.longitude,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA
    });

    

    render() {

        const { navigate } = this.props.navigation;

        return (
            <View style={styles.container}>

                <Maps navigate={navigate} getPolygons={this.state.polygons} getMapRegion={this.getMapRegion.bind(this)} getMonumentProps={this.getMonumentsProperties.bind(this)} />

                <View style={styles.borronProfielView}>
                    <Button
                        onPress={() => navigate('Profile')}
                        buttonStyle={styles.buttonStyle}
                        title="Profiel"
                    />
                </View>

                <View style={styles.bottomStartView}>
                    <Button
                        onPress={this.getMonument}
                        buttonStyle={styles.buttonStyle}
                        title="Start"
                    />
                </View>

            </View>
        );

    }
}

export default Home;

const styles = StyleSheet.create({
    container: {
        alignItems: 'stretch',
        flex: 1,
    },
    buttonStyle: {
        backgroundColor: "rgba(92, 99,216, 1)",
        width: 200,
        height: 45,
        borderColor: "transparent",
        borderWidth: 0,
        borderRadius: 5
    },
    bottomStartView: {
        position: 'absolute',
        bottom: '2%',
        alignItems: 'center'
    },
    borronProfielView: {
        position: 'absolute',
        top: '2%',
        alignSelf: 'flex-end'
    }
});