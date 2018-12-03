import React, { Component } from "react";
import { StyleSheet, DeviceEventEmitter, View,Button, TouchableHighlight,Text } from "react-native";
import MapView, { Polygon } from "react-native-maps";
import { SensorManager } from 'NativeModules';
import mapStyle from "../styles/jsons/mapstyle";

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
        console.log(this.props.children)
    }

    renderQuizes() {
        if (typeof this.props.polygon != "undefinded") {
            return
        }
    }

    renderPolygon() {
        if (this.props.getPolygons.length > 0) {
            return (
                <View>
                    <Polygon
                        coordinates={this.props.getPolygons}
                        fillColor='red'
                        strokeColor='black'
                        tappable={true}
                        onPress={() => this.props.navigate('Camera', {
                            monumentProps: this.props.getMonumentProps
                        })}
                    >
                    </Polygon>
                </View>
            )
        }
    }

    render() {
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

                {this.props.getRandom.map(marker => (
                    <MapView.Marker
                        key={marker.latitude}
                        coordinate={{ latitude: marker.latitude, longitude: marker.longitude }}
                        //title={"Quiz"}
                        image={require('../assets/quiz.png')}
                       // description={"description"}
                        onPress={() => this.props.Quiz2()} >
                       
                        
                        </MapView.Marker>
                  
                    
                ))}


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
    buttonStyle: {
        backgroundColor: "rgba(92, 99,216, 1)",
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