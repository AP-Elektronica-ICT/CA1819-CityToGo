import React, { Component } from "react";
import { StyleSheet, DeviceEventEmitter, View, Button, TouchableHighlight, Text, ActivityIndicator, Image, Platform } from "react-native";
import MapView, { Polygon, Marker, AnimatedRegion } from "react-native-maps";
import { SensorManager } from 'NativeModules';
import mapStyle from "../styles/jsons/mapstyle";
import Mycard from "./Cardcomponent"

// import { orientation } from "../redux/actions/orientationAction";
// import { connect } from "react-redux";

const LATITUDE_DELTA = 0.003;
const LONGITUDE_DELTA = 0.003;
const LATITUDE = 0;
const LONGITUDE = 0;


class Maps extends Component {

    componentWillMount() {

        // SensorManager.startOrientation(100);
        // DeviceEventEmitter.addListener('Orientation', orientation => {
        //     if (this.props.currentLocation.fetched) {
        //         this.map.animateToBearing(Math.round(orientation.azimuth), 100); 
        //     }
        // });
        // SensorManager.stopAccelerometer();

    }

    componentWillUnmount() {
        // DeviceEventEmitter.listeners('Orientation').remove();
    }

    renderQuizes() {
        if (typeof this.props.polygon != "undefinded") {
            return
        }
    }
    //Trigger Camera
    Camera = () => {
        console.log("Map afstand " + this.props.triggerCamera)
        if (this.props.triggerCamera < 1000) {
            this.props.navigate('Camera', {
                monumentProps: this.props.getMonumentProps,

            })
        }
    }


    renderPolygon() {
        if (this.props.getPolygons.length > 0) {
            return (
                <View>

                    <MapView.Marker
                        coordinate={{ latitude: this.props.lat, longitude: this.props.long }}
                        image={require('../assets/icons/checkpoint.png')}
                        onPress={this.Camera}>
                    </MapView.Marker>
                </View>
            )
        }
    }

    getMapRegion() {
        return ({
            latitude: this.props.currentLocation.coords.latitude,
            longitude: this.props.currentLocation.coords.longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA
        })
    }

    render() {

        const { latitude, longitude } = this.props.currentLocation.coords
        const { fetched, coords } = this.props.currentLocation


        if (fetched) {
            if (this.marker) {
                this.marker.animateMarkerToCoordinate(
                    coords,
                    500
                );
            }
            if (this.map) {

                this.map.animateToRegion(
                    this.getMapRegion(),
                    500
                )
            }




            return (

                <MapView
                    style={styles.map}
                    initialRegion={this.getMapRegion()}
                    showsUserLocation={false}
                    showsMyLocationButton
                    followUserLocation
                    loadingEnabled
                    //scrollEnabled={false}
                    //pitchEnabled={false}
                    //zoomEnabled={false}
                    //rotateEnabled={false}
                    //customMapStyle={mapStyle}
                    ref={ref => { this.map = ref; }}
                //onLayout={() => }
                >
                    {this.renderPolygon()}

                    <Marker
                        ref={marker => { this.marker = marker; }}
                        coordinate={{ latitude: latitude, longitude: longitude }}
                    >
                        <View><Image source={{ uri: this.props.profilePic }} style={styles.avatar} /></View>

                    </Marker>

                    {this.props.getRandom.map(marker => (
                        <MapView.Marker
                            key={marker.latitude}
                            coordinate={{ latitude: marker.latitude, longitude: marker.longitude }}
                            //title={"Quiz"}
                            image={require('../assets/icons/quiz.png')}
                            // description={"description"}
                            onPress={() => this.props.Quiz2(marker.latitude, marker.longitude)} >
                        </MapView.Marker>
                    ))}
                    {this.props.getmarker.map(mark => (
                        <Mycard
                            key={mark.coordinate.latitude}
                            latitude={mark.coordinate.latitude}
                            longitude={mark.coordinate.longitude}
                            Uri={mark.image}
                            Name={mark.title}
                            visibilty={this.props.monumentVisibility}

                        />

                    ))}

                </MapView>

            );
        } else
            return (
                <View >
                    <ActivityIndicator size="small" />

                </View>
            )
    }
}

const styles = StyleSheet.create({
    map: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },
    buttonStyle: {
        backgroundColor: "rgba(51,204,0,1)",
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
    avatar: {
        width: 28,
        height: 28,
        borderRadius: 63,
        borderWidth: 2,
        borderColor: "#78849E"
    }
});

// function mapStateToProps(state) {
//     return {
//         orientation: state.orientation
//     };
// }
//export default connect(mapStateToProps, { orientation })(Maps);
export default Maps;