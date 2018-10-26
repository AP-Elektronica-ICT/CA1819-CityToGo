import React, { Component } from "react";
import { StyleSheet, DeviceEventEmitter } from "react-native";
import MapView, { AnimatedRegion } from "react-native-maps";
import { SensorManager } from 'NativeModules';
import { mapStyle } from "../styles/jsons/mapstyle";

const LATITUDE = 29.95539;
const LONGITUDE = 78.07513;
const LATITUDE_DELTA = 0.009;
const LONGITUDE_DELTA = 0.009;

class Maps extends Component {

    constructor(props) {
        super(props);
        this.state = {
            latitude: LATITUDE,
            longitude: LONGITUDE,
            coordinate: new AnimatedRegion({
                latitude: LATITUDE,
                longitude: LONGITUDE
            })
        };
    }

    componentDidMount() {
        this.watchID = navigator.geolocation.watchPosition(
            position => {
                const { coordinate } = this.state;
                const { latitude, longitude } = position.coords;

                this.setState({
                    latitude,
                    longitude,
                });
            },
            error => console.log(error),
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
        );
    }

    componentWillMount() {
        navigator.geolocation.getCurrentPosition(
            position => { },
            error => alert(error.message),
            {
                enableHighAccuracy: true,
                timeout: 20000,
                maximumAge: 1000
            }
        );

        SensorManager.startOrientation(100);
        DeviceEventEmitter.addListener('Orientation', orientation => {
            this.refs.map.animateToBearing(Math.round(orientation.azimuth), 200);
        });
        SensorManager.stopAccelerometer();

    }

    componentWillUnmount() {
        navigator.geolocation.clearWatch(this.watchID);
        DeviceEventEmitter.removeCurrentListener()
    }

    getMapRegion = () => ({
        latitude: this.state.latitude,
        longitude: this.state.longitude,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA
    });


    render() {
        return (
            <MapView
                style={styles.map}
                region={this.getMapRegion()}
                showsUserLocation={true}
                //scrollEnabled={false}
                //pitchEnabled={false}
                //zoomEnabled={false}
                //rotateEnabled={false}
                customMapStyle={mapStyle}
                ref="map"
                >
            </MapView>
        );
    }
}
export default Maps;

const styles = StyleSheet.create({
    map: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },
});