import React, { Component } from "react";
import { StyleSheet, DeviceEventEmitter, View } from "react-native";
import MapView, { Polygon } from "react-native-maps";
import { SensorManager } from 'NativeModules';
import mapStyle from "../styles/jsons/mapstyle";
import randomLocation from 'random-location';
import geolib from "geolib";


const MyLocation= {
    latitude: 51.221671666666666,
    longitude: 4.36896
  }
  R=500;
//const center;
// const distanceToCheckpoint;
// const stral = parseInt(distanceToCheckpoint) / 3;
const randomPoint = randomLocation.randomCirclePoint(MyLocation, R)
const randomPoint1 = randomLocation.randomCirclePoint(MyLocation, R)
const randomPoint2 = randomLocation.randomCirclePoint(MyLocation, R)
const randomPoint3 = randomLocation.randomCirclePoint(MyLocation, R)



class Maps extends Component {
    constructor(props) {
        super(props)
        this.state = { location: this.props.getMapRegion()};
        // MyLocation = {
        //     latitude: this.state.location.latitude,
        //     longitude: this.state.location.longitude
        // }
        // center = geolib.getCenter([
        //     { latitude: MyLocation.latitude, longitude: MyLocation.longitude },
        //     { latitude: 51.217141304587265, longitude: 4.3824121758995025 }]);

       // distanceToCheckpoint = randomLocation.distance(MyLocation, { latitude: 51.217141304587265, longitude: 4.3824121758995025 })
       
    }


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
        //console.log('live checkpoint')
        //console.log(this.props.getPolygons().latitude)
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
                    coordinate={randomPoint}
                    title={"Quiz"}
                    image={require('../assets/star.png')}
                    description={"description"}
                />
                <MapView.Marker
                    coordinate={randomPoint1}
                    title={"Quiz"}
                    image={require('../assets/star.png')}
                    description={"description"}
                />
                <MapView.Marker
                    coordinate={randomPoint2}
                    title={"Quiz"}
                    image={require('../assets/star.png')}
                    description={"description"}
                />
                <MapView.Marker
                    coordinate={randomPoint3}
                    title={"Quiz"}
                    image={require('../assets/star.png')}
                    description={"description"}
                />
                {/* <MapView.Marker
                    coordinate={{
                        latitude: parseFloat(center.latitude),
                        longitude: parseFloat(center.longitude)
                    }}
                    title={"Middle_Point"}
                    description={"description"}
                /> */}

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