import React, { Component } from "react";
import { StyleSheet, DeviceEventEmitter, View } from "react-native";
import MapView, { Polygon } from "react-native-maps";
import { SensorManager } from 'NativeModules';
import mapStyle from "../styles/jsons/mapstyle";

const LATITUDE = 29.95539;
const LONGITUDE = 78.07513;
const LATITUDE_DELTA = 0.009;
const LONGITUDE_DELTA = 0.009;

class Maps extends Component {

    componentWillMount() {

        SensorManager.startOrientation(100);
        DeviceEventEmitter.addListener('Orientation', orientation => {
            //this.refs.map.animateToBearing(Math.round(orientation.azimuth), 200);
        });
        SensorManager.stopAccelerometer();
    }

    componentWillUnmount() {
        //DeviceEventEmitter.removeCurrentListener()
    }
    render() {
        console.log(this.props.getPolygons)
        return (
            <MapView
                style={styles.map}
                region={this.props.getMapRegion()}
                showsUserLocation={true}
                showUserLocation
                followUserLocation
                loadingEnabled
                //scrollEnabled={false}
                //pitchEnabled={false}
                //zoomEnabled={false}
                //rotateEnabled={false}
                customMapStyle={mapStyle}
                ref="map"

            >
                {/* {this.props.getPolygons.map((polygon, index) => (
                    <View key={index}>
                        <Polygon
                            coordinates={polygon.coordinates}
                        //onPress={() => this.toggle(polygon)}
                        />
                    </View>
                ))} */}
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