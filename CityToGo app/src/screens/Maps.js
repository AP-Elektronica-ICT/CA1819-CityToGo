import React, { Component } from "react";
import { StyleSheet, DeviceEventEmitter, View,Button, TouchableHighlight,Text } from "react-native";
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
        console.log(this.props.children)
    }
    
    renderQuizes(){
        if(typeof this.props.polygon != "undefinded"){
            return
        }
    }
//     renderQuizes(){
        
//         console.log("it's not undefined")
//          this.props.getRandom.map((marker)=> {
//         return(
//         <MapView.Marker
//         coordinate={{ latitude: marker.latitude, longitude: marker.longitude }}
//         title={"Quiz"}
//         image={require('../assets/star.png')}
//         description={"description"}
//     />
//         )
// })
//     }
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
                
              
                    
                
                {this.props.getRandom.map(marker => (
                    <MapView.Marker
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