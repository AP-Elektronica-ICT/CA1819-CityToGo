import React, { Component } from "react";
import { StyleSheet, DeviceEventEmitter, View } from "react-native";
import MapView, { Polygon } from "react-native-maps";
import { SensorManager } from 'NativeModules';
import mapStyle from "../styles/jsons/mapstyle";

const LATITUDE = 29.95539;
const LONGITUDE = 78.07513;
const LATITUDE_DELTA = 0.009;
const LONGITUDE_DELTA = 0.009;
var markers = [
    {
      latitude: 45.65,
      longitude: -78.90,
      title: 'Foo Place',
      subtitle: '1234 Foo Drive'
    }
  ];

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
            console.log("im ready")
            return (
                <Polygon
                    coordinates={polygon}
                    fillColor='red'
                    strokeColor='black'
                />
            )

        } else {
            console.log("ik ben null")
            return (
                null
            )
        }
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
                //showUserLocation
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

              <MapView.Marker
            coordinate={{latitude: 51.21898431205421,
            longitude: 4.373890642444849}}
            title={"Quiz"}
            description={"description"}
         />

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