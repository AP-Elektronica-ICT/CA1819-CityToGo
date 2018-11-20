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
        //DeviceEventEmitter.listeners('Orientation').remove()
    }

    renderPolygon() {
        const polygon = this.props.getPolygons.map(coordsArr => {
            let coords = {
                latitude: coordsArr[1],
                longitude: coordsArr[0],
            }
            return coords;
        });

        if (this.props.getPolygons.length > 0) {
            return (
                <View>
                    <Polygon
                        coordinates={polygon}
                        fillColor='red'
                        strokeColor='black'
                        onPress={()=> this.polyPress()}
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
        //this.renderPolygon()
        // console.log("fake polygone")
        // console.log(this.state.polygons[0].coordinates[0])
        // console.log("real polygone")
        // console.log(this.props.getPolygons)

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
    },
    capture: {
        flex: 0,
        margin: 20,
        borderWidth: 6,
        borderColor: 'rgba(0,0,0,0.2)',
        alignItems: 'center',
        justifyContent: 'center',
        width: 85,
        height: 85,
        backgroundColor: '#fff',
        borderRadius: 100,
    }
});