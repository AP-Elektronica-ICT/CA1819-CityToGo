import React, { Component } from "react";
import { StyleSheet, DeviceEventEmitter, View } from "react-native";
import MapView, { Polygon } from "react-native-maps";
import { SensorManager } from 'NativeModules';
import mapStyle from "../styles/jsons/mapstyle";







class Maps extends Component {
    constructor(props) {
        super(props)
       

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
        console.log('live checkpoint')
        console.log(this.props.getRandom)
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
                    coordinate={this.props.getRandom[0]}
                    title={"Quiz"}
                    image={require('../assets/star.png')}
                    description={"description"}
                />
                <MapView.Marker
                    coordinate={this.props.getRandom[1]}
                    title={"Quiz"}
                    image={require('../assets/star.png')}
                    description={"description"}
                />
                <MapView.Marker
                    coordinate={this.props.getRandom[2]}
                    title={"Quiz"}
                    image={require('../assets/star.png')}
                    description={"description"}
                />
                <MapView.Marker
                    coordinate={this.props.getRandom[3]}
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