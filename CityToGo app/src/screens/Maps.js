import React, { Component } from "react";
import {
    StyleSheet,
    DeviceEventEmitter,
    View
} from "react-native";
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
       // console.log(this.props.getMonumentProps)
        if (this.props.getPolygons.length > 0) {
            //const { navigate } = this.props.navigation;
            return (
                <View>
                    <Polygon
                        coordinates={this.props.getPolygons}
                        fillColor='red'
                        strokeColor='black'
                        tappable={true}
                        onPress={() => this.props.navigate('Camera',{
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
                        coordinate={{ latitude: marker.latitude, longitude: marker.longitude }}
                        title={"Quiz"}
                        image={require('../assets/star.png')}
                        description={"description"}
                    />
                ))}


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