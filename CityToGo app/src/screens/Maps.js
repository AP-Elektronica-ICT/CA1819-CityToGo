import React, { Component } from "react";
import {
    StyleSheet,
    DeviceEventEmitter,
    View,
    TouchableOpacity,
    Text
} from "react-native";
import MapView, { Polygon } from "react-native-maps";
import { SensorManager } from 'NativeModules';
import mapStyle from "../styles/jsons/mapstyle";
import { pointInPolygon } from 'geojson-utils';
import { NavigationActions, StackActions } from "react-navigation";

class Maps extends Component {

    componentWillMount() {

        SensorManager.startOrientation(100);
        DeviceEventEmitter.addListener('Orientation', orientation => {
            //this.refs.map.animateToBearing(Math.round(orientation.azimuth), 200);
        });
        SensorManager.stopAccelerometer();
    }

    componentWillUnmount() {
        //DeviceEventEmitter.listeners('Orientation').remove()
    }

    renderPolygon() {
        if (this.props.getPolygons.length > 0) {
            //const { navigate } = this.props.navigation;
            return (
                <View>
                    <Polygon
                        coordinates={this.props.getPolygons}
                        fillColor='red'
                        strokeColor='black'
                        tappable={true}
                        onPress={() => this.props.navigate('Camera')}
                    >
                    </Polygon>

                </View>

            )
        }
    }

    polyPress() {
        console.log("poly pressed")

    }
    render() {

        //const { navigate } = this.props.navigation;

        return (
            <MapView
                style={styles.map}
                region={this.props.getMapRegion()}
                showsUserLocation={true}
                //followUserLocation
                //loadingEnabled
                //scrollEnabled={false}
                //pitchEnabled={false}
                //zoomEnabled={false}
                //rotateEnabled={false}
                customMapStyle={mapStyle}
                ref="map"
            >
                {this.renderPolygon()}
            </MapView>
        );
    }
}
export default Maps;

const styles = StyleSheet.create({
    map: {
        flex: 1,
    }
});