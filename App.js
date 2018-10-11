import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  DeviceEventEmitter,
  Dimensions
} from 'react-native';

import { SensorManager } from 'NativeModules';
import MapView from 'react-native-maps';
import mapStyle from './Styles/jsons/mapstyle.json'

const { width, height } = Dimensions.get('window')

const SCREEN_HEIGHT = height
const SCREEN_WIDTH = width
const ASPECT_RATIO = width / height
const LATITUDE_DELTA = 0.0082
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO

type Props = {};
export default class App extends Component<Props> {
  constructor(props) {
    super(props)
    this.state = {
      initialOrientation: {
        azimuth: 0,
        pitch: 0,
        roll: 0
      },
      initialRegion: {
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0,
        longitudeDelta: 0
      }
    }
  }

  componentDidMount() {

    this.watchID = navigator.geolocation.watchPosition((position) => {
      var lat = parseFloat(position.coords.latitude)
      var long = parseFloat(position.coords.longitude)

      var lastRegion = {
        latitude: lat,
        longitude: long,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA
      }

      this.setState({ initialRegion: lastRegion })
    },
      (error) => alert(JSON.stringify(error)),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 })

    SensorManager.startOrientation(100);
    this.emitterID = DeviceEventEmitter.addListener('Orientation', orientation => {
     // this.refs.map.animateToBearing(Math.round(orientation.azimuth), 200);
    });
    SensorManager.stopAccelerometer();
  }


  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID)
    DeviceEventEmitter.removeAllListeners('Orientation')
  }

  render() {
    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          region={this.state.initialRegion}
          showsUserLocation={true}
          //scrollEnabled={false}
          //pitchEnabled={false}
          //zoomEnabled={false}
          //rotateEnabled={false}
          customMapStyle={mapStyle}
          ref="map">
        </MapView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});
