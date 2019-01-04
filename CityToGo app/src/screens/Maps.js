import React, { Component } from "react";
import { StyleSheet, DeviceEventEmitter, View, Button, TouchableHighlight, Text, ActivityIndicator, } from "react-native";
import MapView, { Polygon } from "react-native-maps";
import { SensorManager } from 'NativeModules';
import mapStyle from "../styles/jsons/mapstyle";
import Mycard from "./Cardcomponent"

// import { orientation } from "../redux/actions/orientationAction";
// import { connect } from "react-redux";

const LATITUDE_DELTA = 0.003;
const LONGITUDE_DELTA = 0.003;


class Maps extends Component {

    componentWillMount() {

        // SensorManager.startOrientation(100);
        // DeviceEventEmitter.addListener('Orientation', orientation => {
        //     if (this.props.currentLocation.fetched) {
        //        // this.map.animateToBearing(Math.round(orientation.azimuth), 100); 
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
        if (this.props.triggerCamera < 100) {
            this.props.navigate('Camera', {
                monumentProps: this.props.getMonumentProps,

            })
        }
    }
    componentWillUpdate() {
        if (this.props.currentLocation.fetched) {
            this.map.animateToBearing(this.state.orientationAzimuth, 1000);
            console.log(this.state.orientationAzimuth)
        }
    }

    renderPolygon() {
        if (this.props.getPolygons.length > 0) {
            return (
                <View>

                    <MapView.Marker
                        coordinate={{ latitude: this.props.lat, longitude: this.props.long }}
                        image={require('../assets/checkpoint.png')}
                        onPress={this.Camera}>
                    </MapView.Marker>
                </View>
            )
        }
    }

    getMapRegion = () => ({
        latitude: this.props.currentLocation.coords.latitude,
        longitude: this.props.currentLocation.coords.longitude,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA
    });

    render() {

        if (this.props.currentLocation.fetched) {


            return (

                <MapView
                    style={styles.map}
                    region={this.getMapRegion()}
                    showsUserLocation={true}
                    //followUserLocation={true}
                    //loadingEnabled
                    //scrollEnabled={false}
                    //pitchEnabled={false}
                    //zoomEnabled={false}
                    //rotateEnabled={false}
                    //customMapStyle={mapStyle}
                    // ref="map"
                    ref={ref => { this.map = ref; }}
                //onLayout={() => }
                >
                    {this.renderPolygon()}

                    {this.props.getRandom.map(marker => (
                        <MapView.Marker
                            key={marker.latitude}
                            coordinate={{ latitude: marker.latitude, longitude: marker.longitude }}
                            //title={"Quiz"}
                            image={require('../assets/quiz.png')}
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
});

// function mapStateToProps(state) {
//     return {
//         orientation: state.orientation
//     };
// }
//export default connect(mapStateToProps, { orientation })(Maps);
export default Maps;